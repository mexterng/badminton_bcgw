import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSingleComponent} from './member-single.component';

describe('MemberSingleComponent', () => {
  let component: MemberSingleComponent;
  let fixture: ComponentFixture<MemberSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
