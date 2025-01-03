import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsGridComponent } from './components-grid.component';

describe('ComponentsGridComponent', () => {
  let component: ComponentsGridComponent;
  let fixture: ComponentFixture<ComponentsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
