import { AppRouting } from './app-routing.enum';

export interface MenuOption {
  label: string;
  icon?: string;
  routingValue: AppRouting;
}
