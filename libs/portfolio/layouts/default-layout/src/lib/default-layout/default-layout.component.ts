import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-default-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent {}
