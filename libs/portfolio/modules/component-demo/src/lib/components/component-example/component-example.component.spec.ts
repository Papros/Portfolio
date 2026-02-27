import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentExampleComponent } from './component-example.component';

describe('ComponentExampleComponent', () => {
  let component: ComponentExampleComponent;
  let fixture: ComponentFixture<ComponentExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
