import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderOptionComponent } from './slider-option.component';

describe('SliderOptionComponent', () => {
  let component: SliderOptionComponent;
  let fixture: ComponentFixture<SliderOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
