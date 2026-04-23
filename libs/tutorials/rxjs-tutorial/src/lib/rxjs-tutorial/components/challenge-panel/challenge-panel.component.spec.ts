import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengePanelComponent } from './challenge-panel.component';

describe('ChallengePanelComponent', () => {
  let component: ChallengePanelComponent;
  let fixture: ComponentFixture<ChallengePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
