import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconService } from '@portfolio/shared-pack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private iconService: IconService) {}
}
