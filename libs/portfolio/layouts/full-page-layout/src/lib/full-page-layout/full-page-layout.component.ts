import { Component, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation, Router, RouterModule } from '@angular/router';
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
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './full-page-layout.component.html',
  styleUrl: './full-page-layout.component.css',
})
export class FullPageLayoutComponent implements OnInit, OnDestroy {
  private isOpen = new BehaviorSubject<OverlayMenuState>(
    OverlayMenuState.CLOSED
  );

  overlayMenuOptions: OverlayMenuOption[] = [
    {
      label: 'MENU',
      icon: 'home',
      callback: () => {
        console.log('menu-callback');
        this.router.navigateByUrl('/menu');
        console.log('last navigation: ', this.router.navigated);
      },
    },
    {
      label: 'MENU',
      icon: 'home',
      callback: () => {
        console.log('second-callback');
      },
    },
    {
      label: 'MENU',
      icon: 'home',
      callback: () => {
        console.log('second-callback');
      },
    },
    {
      label: 'MENU',
      icon: 'home',
      callback: () => {
        console.log('second-callback');
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

  constructor(private overlayService: OverlayService, private router: Router) {}

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
        this.isOpen.next(OverlayMenuState.CLOSED);
      }
    );
  }

  ngOnDestroy(): void {
    this.overlayService.closeAll();
    this.isOpen.complete();
  }
}
