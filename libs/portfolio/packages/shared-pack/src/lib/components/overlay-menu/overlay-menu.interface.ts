export interface OverlayMenuOption {
  label: string;
  icon: string;
  callback: () => void;
}

export enum OverlayMenuState {
  TOGGLE = 'toggle',
  OPEN = 'open',
  CLOSED = 'closed',
}
