import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsGalleryComponent } from './components-gallery.component';

describe('ComponentsGalleryComponent', () => {
  let component: ComponentsGalleryComponent;
  let fixture: ComponentFixture<ComponentsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentsGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
