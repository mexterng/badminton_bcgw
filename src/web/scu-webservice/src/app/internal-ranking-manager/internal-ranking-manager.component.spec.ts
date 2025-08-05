import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRankingManagerComponent } from './internal-ranking-manager.component';

describe('InternalRankingManagerComponent', () => {
  let component: InternalRankingManagerComponent;
  let fixture: ComponentFixture<InternalRankingManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalRankingManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalRankingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
