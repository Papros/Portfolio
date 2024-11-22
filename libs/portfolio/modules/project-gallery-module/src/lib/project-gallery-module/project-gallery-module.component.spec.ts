import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectGalleryModuleComponent } from './project-gallery-module.component';

describe('ProjectGalleryModuleComponent', () => {
  let component: ProjectGalleryModuleComponent;
  let fixture: ComponentFixture<ProjectGalleryModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGalleryModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectGalleryModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
