import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeContainerComponent } from './pipe-container.component';

describe('PipeContainerComponent', () => {
  let component: PipeContainerComponent;
  let fixture: ComponentFixture<PipeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PipeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
