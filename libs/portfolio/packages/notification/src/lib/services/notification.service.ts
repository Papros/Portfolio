import { Injectable, computed, inject, signal } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationConfig } from '../interfaces/notification-config.interface';
import { NotificationRef } from '../interfaces/notification-ref.interface';
import { map, take } from 'rxjs';
import { NotificationPosition } from '../interfaces/notification.types';
import { DefaultSnackbarComponent, DefaultSnackbarData } from '../components';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private _active = signal<NotificationRef[]>([]);
  readonly active = this._active.asReadonly();
  readonly count = computed(() => this._active().length);
  readonly hasActive = computed(() => this._active().length > 0);

  show(config: NotificationConfig): NotificationRef {
    const id = crypto.randomUUID();
    const panelClass = [
      'lib-snackbar',
      `lib-snackbar--${config.type ?? 'info'}`,
    ];

    const matRef = config.component
      ? this.snackBar.openFromComponent(config.component, {
          data: { ...config.componentData, notificationId: id },
          duration: config.duration ?? 3000,
          horizontalPosition: this.resolveHorizontal(config.position),
          verticalPosition: this.resolveVertical(config.position),
          panelClass,
        })
      : this.snackBar.openFromComponent(DefaultSnackbarComponent, {
          data: {
            message: config.message,
            type: config.type ?? 'info',
            actions: config.actions ?? [],
            notificationId: id,
          } satisfies DefaultSnackbarData,
          duration: config.duration ?? 3000,
          horizontalPosition: this.resolveHorizontal(config.position),
          verticalPosition: this.resolveVertical(config.position),
          panelClass,
        });

    const ref: NotificationRef = {
      id,
      dismiss: () => matRef.dismiss(),
      afterDismissed: () =>
        matRef.afterDismissed().pipe(
          map(() => ({
            id,
            triggeredBy: 'programmatic' as const,
          })),
        ),
      onAction: () => matRef.onAction().pipe(map(() => id)),
    };

    this._active.update((current) => [...current, ref]);

    matRef
      .afterDismissed()
      .pipe(take(1))
      .subscribe(() => {
        this._active.update((current) => current.filter((n) => n.id !== id));
      });

    return ref;
  }

  success(
    message: string,
    config?: Partial<NotificationConfig>,
  ): NotificationRef {
    return this.show({ ...config, message, type: 'success' });
  }

  error(
    message: string,
    config?: Partial<NotificationConfig>,
  ): NotificationRef {
    return this.show({ ...config, message, type: 'error' });
  }

  warning(
    message: string,
    config?: Partial<NotificationConfig>,
  ): NotificationRef {
    return this.show({ ...config, message, type: 'warning' });
  }

  info(message: string, config?: Partial<NotificationConfig>): NotificationRef {
    return this.show({ ...config, message, type: 'info' });
  }

  dismissAll(): void {
    this.snackBar.dismiss();
    this._active.set([]);
  }

  private resolveHorizontal(
    position?: NotificationPosition,
  ): MatSnackBarHorizontalPosition {
    if (!position) return 'center';
    if (position.includes('left')) return 'left';
    if (position.includes('right')) return 'right';
    return 'center';
  }

  private resolveVertical(
    position?: NotificationPosition,
  ): MatSnackBarVerticalPosition {
    if (!position) return 'bottom';
    return position.includes('top') ? 'top' : 'bottom';
  }
}
