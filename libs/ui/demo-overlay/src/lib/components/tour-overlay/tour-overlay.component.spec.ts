import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourOverlayComponent } from './tour-overlay.component';

describe('TourOverlayComponent', () => {
  let component: TourOverlayComponent;
  let fixture: ComponentFixture<TourOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
