import { Component, Input, OnChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  @Input() loading = false;
  levelsArr: Member[][] = [];

  offsetX = 0;
  offsetY = 0;
  zoom = 2;

  private pointers: Map<number, PointerEvent> = new Map();
  private lastPinchDistance: number | null = null;
  isDragging = false;
  lastMouseX = 0;
  lastMouseY = 0;
  moved = false;

  rectWidth = 80;  // Basisbreite ohne Zoom
  rectHeight = 30; // Höhe fix für einzeiligen Text
  spacing = 5;
  baseFontSize = 12;

  constructor(private router: Router) {}

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

  getColor(gender?: 'm' | 'w' | 'd' | 'MX' | 'DD' | 'HD') {
    if (gender === 'm' || gender === 'HD') return 'var(--color-male)';
    if (gender === 'w' || gender === 'DD') return 'var(--color-female)';
    if (gender === undefined) return '#FAFAFA';
    return 'var(--color-divers)';
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
    if (this.moved) return;
    this.router.navigate(['/member', m.member_id]);
  }

  // Drag & Drop
  onPointerDown(event: PointerEvent) {
    this.pointers.set(event.pointerId, event);
    // One finger -> Drag
    if (this.pointers.size === 1) {
      this.isDragging = true;
      this.moved = false;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;

      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    }

    // Two fingers -> start pinch
    if (this.pointers.size === 2) {
      this.isDragging = false; // disable drag
      const [p1, p2] = Array.from(this.pointers.values());
      this.lastPinchDistance = Math.hypot(
        p2.clientX - p1.clientX,
        p2.clientY - p1.clientY
      );
    }
  }

  onPointerMove(event: PointerEvent) {
    event.preventDefault();
    if (!this.pointers.has(event.pointerId)) return;

    this.pointers.set(event.pointerId, event);

    // === Pinch Zoom ===
    if (this.pointers.size === 2) {
      const [p1, p2] = Array.from(this.pointers.values());
      const dist = Math.hypot(
        p2.clientX - p1.clientX,
        p2.clientY - p1.clientY
      );

      if (this.lastPinchDistance) {
        const delta = (dist - this.lastPinchDistance) / 200;
        this.zoom = Math.min(Math.max(this.zoom + delta, 0.2), 5);
      }

      this.lastPinchDistance = dist;
      return; // stop, no drag allowed
    }

    // === Drag ===
    if (this.isDragging) {
      const dx = event.clientX - this.lastMouseX;
      const dy = event.clientY - this.lastMouseY;

      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        this.moved = true;
      }

      this.offsetX += dx;
      this.offsetY += dy;

      const {width: containerWidth, height: containerHeight} =
        this.getContainerSize('.pyramid-container');
      const {width: pyramidWidthZoom, height: pyramidHeightZoom} =
        this.getPyramideSizeZoom();

      this.offsetX = Math.min(
        Math.max(this.offsetX, -pyramidWidthZoom + this.rectWidth * this.zoom),
        pyramidWidthZoom +
        (containerWidth - pyramidWidthZoom) / 2 -
        this.rectWidth * this.zoom
      );
      this.offsetY = Math.min(
        Math.max(this.offsetY, -pyramidHeightZoom + this.rectHeight * this.zoom),
        containerHeight - this.rectHeight * this.zoom
      );

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    }
  }

  onPointerUp(event: PointerEvent) {
    this.pointers.delete(event.pointerId);

    if (this.pointers.size < 2) {
      this.lastPinchDistance = null;
    }

    if (this.pointers.size === 0) {
      this.isDragging = false;
    }

    // Release pointer
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
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