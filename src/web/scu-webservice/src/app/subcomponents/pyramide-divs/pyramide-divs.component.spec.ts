import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PyramideDivsComponent } from './pyramide-divs.component';

describe('PyramideDivsComponent', () => {
  let component: PyramideDivsComponent;
  let fixture: ComponentFixture<PyramideDivsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramideDivsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramideDivsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});