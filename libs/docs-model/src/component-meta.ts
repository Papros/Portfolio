import { ComponentMeta } from "./component-details.interface";

export const COMPONENT_META: ComponentMeta[] = [
  {
    id: 'overlay-menu',
    title: 'Overlay Menu',
    description:
      'A radial menu that expands from a center trigger. Supports hover, click, and external signal-based state control.',
    thumbnail: 'assets/images/component-demo/overlay-menu-icon.png',
  },
  {
    id: 'multistate-slider',
    title: 'Multistate Slider',
    description:
      'A segmented control for selecting one value from a fixed set. Supports icons, projected content, and collapsible expand modes.',
    thumbnail: 'assets/images/component-demo/multistate-slider-icon.png',
  },
  {
    id: 'demo-overlay',
    title: 'Tour & Hint',
    description:
      'Onboarding guide system with sequential tours and lazy contextual hints. ' +
      'Supports spotlight effects, custom templates, cross-route navigation, ' +
      'multiple trigger strategies, and a fully overridable persistence layer.',
    thumbnail: 'assets/images/component-demo/demo-overlay-icon.png',
  }
];