import { Component, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AttachedComponentBackdrop,
  OverlayMenuComponent,
  OverlayMenuOption,
  OverlayMenuState,
  OverlayService,
} from '@portfolio/shared-pack';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-full-page-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './full-page-layout.component.html',
  styleUrl: './full-page-layout.component.css',
})
export class FullPageLayoutComponent implements OnInit {
  private isOpen = new BehaviorSubject<OverlayMenuState>(OverlayMenuState.OPEN);

  overlayMenuOptions: OverlayMenuOption[] = [
    {
      label: 'MENU',
      icon: 'home',
      callback: () => {
        console.log('MENU WORKS1');
      },
    },
    {
      label: 'MENU2',
      icon: 'arrow',
      callback: () => {
        console.log('second-callback');
      },
    },
  ];

  constructor(private overlayService: OverlayService) {}

  ngOnInit(): void {
    this.overlayService.closeAll();
    this.overlayService.attachComponent(
      OverlayMenuComponent,
      {
        menuState: this.isOpen,
        label: 'test123',
        options: this.overlayMenuOptions,
      },
      { bottom: '50px', right: '100px' },
      true,
      [AttachedComponentBackdrop.Transparent],
      () => {
        console.log('callback');
        this.isOpen.next(OverlayMenuState.CLOSED);
      }
    );
  }

  toggle() {
    this.isOpen.next(OverlayMenuState.TOGGLE);
  }
}
