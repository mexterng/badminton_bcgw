import { Component, ElementRef, AfterViewInit, ViewChild, Input, HostListener } from '@angular/core';

interface Member {
  member_id: number;
  display_name: string;
  gender?: 'm' | 'w';
}

@Component({
  selector: 'app-pyramide-canvas',
  templateUrl: './pyramide-canvas.component.html',
  styleUrls: ['./pyramide-canvas.component.scss'],
  standalone: true
})
export class PyramideCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() zoom: number = 0.5;
  private _data: Member[] = [];
  @Input()
  set data(value: Member[]) {
    this._data = value || [];
    this.drawPyramid(true); // automatisch neu zeichnen bei Änderung
  }
  get data(): Member[] {
    return this._data;
  }

  private ctx!: CanvasRenderingContext2D;

  // Drag & Drop Variablen
  private offsetX: number = 0;
  private offsetY: number = 0;
  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.drawPyramid();
  }

  private getColor(gender?: 'm' | 'w'): string {
    if (gender === 'm') return '#ADD8E6';
    if (gender === 'w') return '#FFB6C1';
    return '#D3D3D3';
  }

  private getLevels(): Member[][] {
    const levelsArr: Member[][] = [];
    let start = 0;
    let levelSize = 1;

    while (start < this.data.length) {
      const level = this.data.slice(start, start + levelSize).map(i => ({ ...i }));
      levelsArr.push(level);
      start += levelSize;
      levelSize++;
    }

    const lastLevel = levelsArr[levelsArr.length - 1];
    if (lastLevel !== undefined) {
      while (lastLevel.length < levelsArr.length) {
        lastLevel.push({ member_id: 0, display_name: '', gender: undefined });
      }
    }

    return levelsArr;
  }

  drawPyramid(reset: boolean = false) {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;

    // Canvas auf Containergröße setzen
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const levelsArr = this.getLevels();

    // Berechne maximale Rechteckbreite nach längstem Text
    let maxTextWidth = 0;
    const baseFontSize = 14;
    levelsArr.flat().forEach(item => {
      this.ctx.font = `${baseFontSize}px Arial`;
      const w = this.ctx.measureText(item.display_name).width + 20; // horizontal Padding
      if (w > maxTextWidth) maxTextWidth = w;
    });

    // Höhe fix: Schriftgröße + vertikales Padding
    const rectHeight = baseFontSize + 10;

    // Spacing
    const spacing = 10;

    // Dynamischen Zoom berechnen, falls reset=true
    if (reset) {
      // Breite der größten Level
      const maxLevelLength = Math.max(...levelsArr.map(l => l.length));
      const totalWidth = maxLevelLength * maxTextWidth + (maxLevelLength - 1) * spacing;
      const totalHeight = levelsArr.length * (rectHeight + spacing);

      const zoomX = canvas.width / totalWidth;
      const zoomY = canvas.height / totalHeight;
      this.zoom = Math.min(zoomX, zoomY, 1); // Zoom <=1, damit nicht vergrößert wird

      // Offsets zurücksetzen
      this.offsetX = 0;
      this.offsetY = 0;
    }

    const rectWidth = maxTextWidth * this.zoom;
    const rectH = rectHeight * this.zoom;
    const gap = spacing * this.zoom;

    const startX = canvas.width / 2 + this.offsetX;
    const startY = 5 + this.offsetY;

    this.ctx.font = `${baseFontSize * this.zoom}px Arial`;

    levelsArr.forEach((level, levelIdx) => {
      const y = startY + levelIdx * (rectH + gap);
      const totalWidth = level.length * rectWidth + (level.length - 1) * gap;
      let x = startX - totalWidth / 2;

      level.forEach(item => {
        this.ctx.fillStyle = this.getColor(item.gender);
        this.ctx.fillRect(x, y, rectWidth, rectH);
        this.ctx.strokeStyle = '#000';
        this.ctx.strokeRect(x, y, rectWidth, rectH);

        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(item.display_name, x + rectWidth / 2, y + rectH / 2);

        x += rectWidth + gap;
      });
    });
  }


  // Maus-Rad-Zoom
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.1 : -0.1;
    this.zoom = Math.min(Math.max(this.zoom + delta, 0.2), 5);
    this.drawPyramid();
  }

  // Drag & Drop Maus
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const dx = event.clientX - this.lastMouseX;
    const dy = event.clientY - this.lastMouseY;
    this.offsetX += dx;
    this.offsetY += dy;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.drawPyramid();
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  // Optional: zwei-Finger-Zoom für Touch
  @HostListener('pinch', ['$event'])
  onPinch(event: any) {
    this.zoom = Math.min(Math.max(this.zoom * event.scale, 0.2), 5);
    this.drawPyramid();
  }
}