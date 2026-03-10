import {
  ComponentRef,
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
  AttachOptions,
  ComponentInputs,
} from './overlay.interface';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService implements OnDestroy {
  private overlayRefs = new Map<OverlayRef, Subscription>();

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {}

  attachComponent<T>(
    component: Type<T>,
    inputs: ComponentInputs<T> = {},
    options: AttachOptions = {},
  ): { overlayRef: OverlayRef; componentRef: ComponentRef<T> } {
    const {
      position = {},
      hasBackdrop = true,
      backdropClass = [AttachedComponentBackdrop.Transparent],
      backdropCallback,
    } = options;

    const positionStrategy = this.overlay
      .position()
      .global()
      .top(position.top ?? '0px')
      .left(position.left ?? '0px')
      .right(position.right ?? 'auto')
      .bottom(position.bottom ?? 'auto');

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop,
      backdropClass: ['noninteractive-backdrop', ...backdropClass],
    });

    const portal = new ComponentPortal(component, null, this.injector);
    const componentRef = overlayRef.attach(portal);

    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== undefined) {
        componentRef.setInput(key, value);
      }
    });

    const sub = new Subscription();

    if (hasBackdrop && backdropCallback) {
      sub.add(
        overlayRef.backdropClick().subscribe((event: MouseEvent) => {
          if (
            (event.target as HTMLElement).matches(
              'button, a, input, textarea, select, label, [data-ignore-backdrop]',
            )
          ) {
            return;
          }
          backdropCallback();
        }),
      );
    }

    this.overlayRefs.set(overlayRef, sub);

    return { overlayRef, componentRef };
  }

  close(overlayRef: OverlayRef): void {
    const sub = this.overlayRefs.get(overlayRef);
    sub?.unsubscribe();
    overlayRef.dispose();
    this.overlayRefs.delete(overlayRef);
  }

  closeAll(): void {
    this.overlayRefs.forEach((sub, overlayRef) => {
      sub.unsubscribe();
      overlayRef.dispose();
    });
    this.overlayRefs.clear();
  }

  ngOnDestroy(): void {
    this.closeAll();
  }
}
