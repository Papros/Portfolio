import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumVitaeModuleComponent } from './curriculum-vitae-module.component';

describe('CurriculumVitaeModuleComponent', () => {
  let component: CurriculumVitaeModuleComponent;
  let fixture: ComponentFixture<CurriculumVitaeModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumVitaeModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumVitaeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
