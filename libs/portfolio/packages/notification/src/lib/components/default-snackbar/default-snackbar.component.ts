import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NotificationType } from '../../interfaces/notification.types';
import { NotificationAction } from '../../interfaces/notification-config.interface';
import { MatIconModule } from '@angular/material/icon';

export interface DefaultSnackbarData {
  message: string;
  type: NotificationType;
  actions: NotificationAction[];
  notificationId: string;
}

const ICONS: Record<NotificationType, string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

@Component({
  selector: 'lib-default-snackbar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './default-snackbar.component.html',
  styleUrl: './default-snackbar.component.scss',
})
export class DefaultSnackbarComponent {
  data = inject(MAT_SNACK_BAR_DATA) as DefaultSnackbarData;
  snackBarRef = inject(MatSnackBarRef);

  icon = computed(() => ICONS[this.data.type]);

  onAction(id: string): void {
    this.snackBarRef.dismissWithAction();
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
