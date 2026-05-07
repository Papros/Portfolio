import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsTutorialPageComponent } from './rxjs-tutorial-page.component';

describe('RxjsTutorialPageComponent', () => {
  let component: RxjsTutorialPageComponent;
  let fixture: ComponentFixture<RxjsTutorialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsTutorialPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsTutorialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
