import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentDetailsComponent } from './component-details.component';

describe('ComponentDocComponent', () => {
  let component: ComponentDetailsComponent;
  let fixture: ComponentFixture<ComponentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
