import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourProgressComponent } from './tour-progress.component';

describe('TourProgressComponent', () => {
  let component: TourProgressComponent;
  let fixture: ComponentFixture<TourProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TourProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
