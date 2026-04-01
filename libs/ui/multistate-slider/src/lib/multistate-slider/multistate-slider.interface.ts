export type SliderExpandMode = 'always' | 'hover' | 'click';
export type SliderExpandDirection = 'ltr' | 'rtl' | 'center' | 'ttb' | 'btt';

export interface SliderConfig {
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  expandMode?: SliderExpandMode;
  expandDirection?: SliderExpandDirection;
  overlayExpand?: boolean;
}

export interface SliderOption<T = unknown> {
  value: T;
  icon?: string;
  label?: string;
  disabled?: boolean;
}
