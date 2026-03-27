import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultSnackbarComponent } from './default-snackbar.component';

describe('DefaultSnackbarComponent', () => {
  let component: DefaultSnackbarComponent;
  let fixture: ComponentFixture<DefaultSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultSnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
