import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelfMenuComponentComponent } from './shelf-menu-component.component';

describe('ShelfMenuComponentComponent', () => {
  let component: ShelfMenuComponentComponent;
  let fixture: ComponentFixture<ShelfMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelfMenuComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShelfMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
