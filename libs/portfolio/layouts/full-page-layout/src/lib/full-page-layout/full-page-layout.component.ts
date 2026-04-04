import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OverlayService } from '@portfolio/shared-pack';
import {
  OverlayMenuState,
  OverlayMenuOption,
  OverlayMenuComponent,
} from '@papros-it/overlay-menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-full-page-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './full-page-layout.component.html',
  styleUrl: './full-page-layout.component.scss',
})
export class FullPageLayoutComponent implements OnInit, OnDestroy {
  private menuState = signal(OverlayMenuState.CLOSED);

  overlayMenuOptions: OverlayMenuOption[] = [
    {
      id: 'home1',
      label: 'MENU',
      icon: 'home',
    },
    {
      id: 'home2',
      label: 'MENU',
      icon: 'home',
    },
    {
      id: 'home3',
      label: 'MENU',
      icon: 'home',
    },
    {
      id: 'home4',
      label: 'MENU',
      icon: 'home',
    },
    {
      id: 'home5',
      label: 'MENU2',
      icon: 'arrow',
    },
  ];

  constructor(
    private overlayService: OverlayService,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //this.attachMenu();
    console.log();
  }

  attachMenu() {
    this.overlayService.closeAll();
    const { overlayRef, componentRef } = this.overlayService.attachComponent(
      OverlayMenuComponent,
      {
        options: this.overlayMenuOptions,
        stateSignal: this.menuState,
      },
      {
        position: { bottom: '50px', right: '100px' },
        backdropCallback: () => this.menuState.set(OverlayMenuState.CLOSED),
      },
    );

    componentRef.instance.optionSelected
      .pipe(takeUntilDestroyed<OverlayMenuOption>(this.destroyRef))
      .subscribe({
        next: (option) => {
          this.onMenuCallback(option);
        },
      });
  }

  onMenuCallback(option: OverlayMenuOption) {
    switch (option.id) {
      case 'home1':
      case 'home2':
      case 'home3':
      case 'home4':
      case 'home5':
      case 'default':
        this.router.navigateByUrl('/menu');
        return;
    }
  }

  ngOnDestroy(): void {
    this.overlayService.closeAll();
  }
}
