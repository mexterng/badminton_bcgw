import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCategorySelectorComponent } from './game-category-selector.component';

describe('GameCategorySelectorComponent', () => {
  let component: GameCategorySelectorComponent;
  let fixture: ComponentFixture<GameCategorySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCategorySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
