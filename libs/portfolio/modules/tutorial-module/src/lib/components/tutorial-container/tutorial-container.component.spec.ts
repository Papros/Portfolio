import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialContainerComponent } from '../components/tutorial-container.component';

describe('TutorialContainerComponent', () => {
  let component: TutorialContainerComponent;
  let fixture: ComponentFixture<TutorialContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
