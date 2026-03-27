import { NotificationPosition, NotificationType } from './notification.types';
import { ComponentType } from '@angular/cdk/portal';

export interface NotificationConfig {
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  actions?: NotificationAction[];
  component?: ComponentType<unknown>;
  componentData?: Record<string, unknown>;
}

export interface NotificationAction {
  label: string;
  id: string;
  style?: 'primary' | 'ghost';
}
