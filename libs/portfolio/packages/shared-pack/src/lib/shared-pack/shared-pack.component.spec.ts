import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedPackComponent } from './shared-pack.component';

describe('SharedPackComponent', () => {
  let component: SharedPackComponent;
  let fixture: ComponentFixture<SharedPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
