import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconService } from '@portfolio/shared-pack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private iconService: IconService,
    private router: Router,
  ) {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      router.navigateByUrl(redirect);
    }
  }
}
