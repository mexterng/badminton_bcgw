import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetInputComponent } from './set-input.component';

describe('PyramideDivsComponent', () => {
  let component: SetInputComponent;
  let fixture: ComponentFixture<SetInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});