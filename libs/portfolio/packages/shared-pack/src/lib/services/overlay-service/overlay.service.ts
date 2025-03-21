import {
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Type,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AttachedComponentBackdrop,
  AttachedComponentPosition,
  ComponentInputs,
} from './overlay.interface';
import { Injector as AngularInjector } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService implements OnDestroy {
  private overlayRefs: OverlayRef[] = [];
  private bulkSubscription$ = new Subscription();

  constructor(private overlay: Overlay, private injector: Injector) {
    this.overlayRefs = [];
  }

  attachComponent<T>(
    component: Type<T>,
    inputs: ComponentInputs<T> = {},
    position: AttachedComponentPosition = {},
    hasBackdrop = true,
    backdropClass: AttachedComponentBackdrop[] = [
      AttachedComponentBackdrop.Transparent,
    ],
    backdropCallback: () => void
  ): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .top(position.top || '0px')
      .left(position.left || '0px')
      .right(position.right || 'auto')
      .bottom(position.bottom || 'auto');

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop,
      backdropClass: ['noninteractive-backdrop', ...backdropClass],
    });

    const injector = this.createInjector(inputs);

    const portal = new ComponentPortal(component, null, injector);
    const componentRef = overlayRef.attach(portal);

    Object.keys(inputs).forEach((inputKey) => {
      const key = inputKey as keyof T;
      const inputValue = inputs[key];
      if (inputValue !== undefined) {
        componentRef.setInput(inputKey, inputValue);
      }
    });

    if (hasBackdrop) {
      const backdropSub$ = overlayRef.backdropClick().subscribe({
        next: (event: MouseEvent) => {
          if (
            (event.target as HTMLElement).matches(
              'button, a, input, textarea, select, label, [data-ignore-backdrop]'
            )
          ) {
            console.log('Backdrop ignored');
            return;
          }

          console.log('Backdrop ', event.target);
          backdropCallback();
        },
      });

      this.bulkSubscription$.add(backdropSub$);
    }

    this.overlayRefs.push(overlayRef);

    return overlayRef;
  }

  close(overlayRef: OverlayRef) {
    const index = this.overlayRefs.indexOf(overlayRef);
    if (index !== -1) {
      this.overlayRefs[index].dispose();
      this.overlayRefs.splice(index, 1);
    }
  }

  closeAll() {
    this.overlayRefs.forEach((overlayRef) => overlayRef.dispose());
    this.overlayRefs = [];
  }

  private createInjector(inputs: { [key: string]: any }) {
    const providers = Object.keys(inputs).map((key) => {
      const token = new InjectionToken<any>(key);
      return {
        provide: token,
        useValue: inputs[key],
      };
    });

    const customInjector = Injector.create({
      providers,
      parent: this.injector,
    });

    return customInjector;
  }

  ngOnDestroy(): void {
    this.bulkSubscription$?.unsubscribe();
  }
}
