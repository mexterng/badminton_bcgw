import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PyramideCanvasComponent } from './pyramide-canvas.component';

describe('PyramideCanvasComponent', () => {
  let component: PyramideCanvasComponent;
  let fixture: ComponentFixture<PyramideCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramideCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramideCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});