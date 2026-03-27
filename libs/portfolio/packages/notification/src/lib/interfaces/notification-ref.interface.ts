import { Observable } from 'rxjs';

export interface NotificationRef {
  id: string;
  dismiss: () => void;
  afterDismissed: () => Observable<NotificationDismissEvent>;
  onAction: () => Observable<string>; // emituje action.id
}

export interface NotificationDismissEvent {
  id: string;
  triggeredBy: 'timeout' | 'user' | 'programmatic';
}
