import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramideComponent } from './pyramide.component';

describe('PyramideComponent', () => {
  let component: PyramideComponent;
  let fixture: ComponentFixture<PyramideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PyramideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PyramideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
