import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarbleTrackComponent } from './marble-track.component';

describe('MarbleTrackComponent', () => {
  let component: MarbleTrackComponent;
  let fixture: ComponentFixture<MarbleTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarbleTrackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarbleTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
