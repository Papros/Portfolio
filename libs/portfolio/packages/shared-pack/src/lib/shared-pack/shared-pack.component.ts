import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-shared-pack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-pack.component.html',
  styleUrl: './shared-pack.component.css',
})
export class SharedPackComponent {}
