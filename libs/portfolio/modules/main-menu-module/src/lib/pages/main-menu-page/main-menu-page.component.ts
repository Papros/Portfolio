import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelfMenuComponentComponent } from '../../components/shelf-menu-component/shelf-menu-component.component';

@Component({
  selector: 'lib-main-menu-page',
  imports: [CommonModule, ShelfMenuComponentComponent],
  templateUrl: './main-menu-page.component.html',
  styleUrl: './main-menu-page.component.scss',
})
export class MainMenuPageComponent {}
