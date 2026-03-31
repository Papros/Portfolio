export interface SliderConfig {
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export interface SliderOption<T = unknown> {
  value: T;
  icon?: string;
  label?: string;
  disabled?: boolean;
}
