import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentDemoPageComponent } from './component-demo-page.component';

describe('ComponentDemoPageComponent', () => {
  let component: ComponentDemoPageComponent;
  let fixture: ComponentFixture<ComponentDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentDemoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
