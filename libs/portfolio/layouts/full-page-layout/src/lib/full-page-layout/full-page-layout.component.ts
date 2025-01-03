import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-full-page-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './full-page-layout.component.html',
  styleUrl: './full-page-layout.component.css',
})
export class FullPageLayoutComponent {}
