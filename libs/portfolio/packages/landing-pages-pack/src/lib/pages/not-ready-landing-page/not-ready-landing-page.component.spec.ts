import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotReadyLandingPageComponent } from './not-ready-landing-page.component';

describe('NotReadyLandingPageComponent', () => {
  let component: NotReadyLandingPageComponent;
  let fixture: ComponentFixture<NotReadyLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotReadyLandingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotReadyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
