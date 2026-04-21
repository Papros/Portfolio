import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialMenuPageComponent } from './tutorial-menu-page.component';

describe('TutorialMenuPageComponent', () => {
  let component: TutorialMenuPageComponent;
  let fixture: ComponentFixture<TutorialMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialMenuPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
