import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultistateSliderComponent } from './multistate-slider.component';

describe('MultistateSliderComponent', () => {
  let component: MultistateSliderComponent;
  let fixture: ComponentFixture<MultistateSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultistateSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultistateSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
