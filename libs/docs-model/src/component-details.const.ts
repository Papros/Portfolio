import { ComponentDoc } from './component-details.interface';

export const COMPONENT_REGISTRY: Record<string, () => Promise<ComponentDoc>> = {
  'overlay-menu': () => import('./overlay-menu.const').then(m => m.overlayMenuDoc),
  'multistate-slider': () => import('./multistate-slider.const').then(m => m.multistateSliderDoc),
};