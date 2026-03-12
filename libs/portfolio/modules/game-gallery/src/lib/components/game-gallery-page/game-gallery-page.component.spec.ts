import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameGalleryPageComponent } from './game-gallery-page.component';

describe('GameGalleryPageComponent', () => {
  let component: GameGalleryPageComponent;
  let fixture: ComponentFixture<GameGalleryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameGalleryPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
