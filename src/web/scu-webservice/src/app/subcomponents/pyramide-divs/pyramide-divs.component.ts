import { Component, Input, OnChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Member {
  member_id: number;
  display_name: string;
  gender?: 'm' | 'w';
  rank?: number;
}

@Component({
  selector: 'app-pyramide-divs',
  templateUrl: 'pyramide-divs.component.html',
  styleUrls: ['pyramide-divs.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class PyramideDivsComponent implements OnChanges {
  @Input() data: Member[] = [];
  levelsArr: Member[][] = [];

  offsetX = 0;
  offsetY = 0;
  zoom = 2;

  isDragging = false;
  lastMouseX = 0;
  lastMouseY = 0;

  rectWidth = 80;  // Basisbreite ohne Zoom
  rectHeight = 30; // Höhe fix für einzeiligen Text
  spacing = 10;
  baseFontSize = 12;

  private measureTextWidth(text: string): number {
    // Temporärer Canvas für Textmessung
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${this.baseFontSize}px Arial`;
    return ctx.measureText(text).width + 20; // Padding horizontal
  }

  ngOnChanges() {
    this.levelsArr = this.getLevels();
    this.computeRectWidth();
    this.adjustZoomAndOffsets(true);
  }

  private computeRectWidth() {
    let maxWidth = 0;
    this.levelsArr.flat().forEach(item => {
      const w = this.measureTextWidth(item.display_name);
      if (w > maxWidth) maxWidth = w;
    });
    this.rectWidth = maxWidth;
  }

  private getLevels(): Member[][] {
    const levels: Member[][] = [];
    let start = 0;
    let size = 1;
    let rankCounter = 1;
    while (start < this.data.length) {
      const level = this.data.slice(start, start + size).map(i => ({...i, rank: rankCounter ++}));
      levels.push(level);
      start += size;
      size++;
    }
    // letzte Ebene ggf. auffüllen
    const last = levels[levels.length - 1];
    if (last && last.length < levels.length) {
      while (last.length < levels.length) last.push({ member_id: 0, display_name: '', gender: undefined , rank: undefined});
    }
    return levels;
  }

  getColor(gender?: 'm' | 'w') {
    if (gender === 'm') return '#ADD8E6';
    if (gender === 'w') return '#FFB6C1';
    return '#D3D3D3';
  }

  getLevelY(index: number) {
    return this.offsetY + index * (this.rectHeight + this.spacing) * this.zoom;
  }

  getLevelX(levelIndex: number) {
    const level = this.levelsArr[levelIndex];
    if (!level) return 0;

    const totalLevelWidth = level.length * (this.rectWidth + this.spacing) - this.spacing;
    const { width: containerWidth } = this.getContainerSize('.pyramid-container');

    // horizontal zentrieren + Offset
    return this.offsetX + (containerWidth - totalLevelWidth * this.zoom) / 2;
  }


  onMemberClick(m: Member) {
    console.log('Clicked', m);
  }

  // Drag & Drop
  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onDragMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const dx = event.clientX - this.lastMouseX;
    const dy = event.clientY - this.lastMouseY;
    this.offsetX += dx;
    this.offsetY += dy;

    const {width: containerWidth, height: containerHeight} = this.getContainerSize('.pyramid-container');
    const {width: pyramidWidthZoom, height: pyramidHeightZoom} = this.getPyramideSizeZoom();

    this.offsetX = Math.min(Math.max(this.offsetX, -pyramidWidthZoom + this.rectWidth * this.zoom), pyramidWidthZoom + (containerWidth - pyramidWidthZoom)/2 - this.rectWidth * this.zoom);
    this.offsetY = Math.min(Math.max(this.offsetY, -pyramidHeightZoom + this.rectHeight * this.zoom), containerHeight - this.rectHeight * this.zoom);

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onDragEnd(event: MouseEvent) {
    this.isDragging = false;
  }

  // Zoom via Maus-Rad
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.1 : -0.1;
    this.zoom = Math.min(Math.max(this.zoom + delta, 0.2), 5);
  }

  // Automatische Zoom-Anpassung beim Reset
  adjustZoomAndOffsets(reset: boolean = false) {
    
    if (!this.levelsArr.length) return;
    
    // Breite der größten Ebene
    const maxLevel = Math.max(...this.levelsArr.map(l => l.length));
    const totalWidth = maxLevel * (this.rectWidth + this.spacing);
    const totalHeight = this.levelsArr.length * (this.rectHeight + this.spacing);
    
    const {width: containerWidth, height: containerHeight} = this.getContainerSize('.pyramid-container');
    const zoomX = containerWidth / totalWidth;
    const zoomY = containerHeight / totalHeight;
    
    this.zoom = Math.min(zoomX, zoomY);

    if (reset) {
      const {height: pyramidHeightZoom} = this.getPyramideSizeZoom();
      this.offsetX = 0;
      this.offsetY = (containerHeight - pyramidHeightZoom) / 2;
    }
  }

  private getContainerSize(querySelectorId: string){
    const container = document.querySelector(querySelectorId) as HTMLElement;
    if (container) {
      return {width: container.clientWidth, height: container.clientHeight};
    }
    return {width: 0, height: 0};
  }

  private getPyramideSizeZoom(){
    const width = this.levelsArr.length * this.rectWidth * this.zoom + (this.levelsArr.length - 1) * this.spacing * this.zoom;
    const height = this.levelsArr.length * this.rectHeight * this.zoom + (this.levelsArr.length - 1) * this.spacing * this.zoom;
    return {width: width, height: height};
  }
}