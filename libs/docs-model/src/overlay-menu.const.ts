import { ComponentDoc } from './component-details.interface';
import {
  CustomSpreadOverlayMenuExampleComponent,
  DefaultOverlayMenuExampleComponent,
  ExternalStateOverlayMenuExampleComponent,
} from '@docs/overlay-menu';

export const overlayMenuDoc: ComponentDoc = {
  id: 'overlay-menu',
  meta: {
    id: 'overlay-menu',
    title: 'Overlay Menu',
    description:
      'A radial menu that expands from a center trigger. Supports hover, click, and external signal-based state control.',
    thumbnail: 'assets/images/component-demo/overlay-menu-icon.png',
  },
  overview: {
    sections: [
      {
        type: 'markdown',
        id: 'overview',
        title: 'Overview',
        content:
          'OverlayMenu displays a set of options arranged in a circular pattern around a central trigger. ' +
          'The menu opens on hover or click, and supports both internal and external state management via Angular signals. ' +
          'The spread angle and radius are fully configurable.',
      },
      {
        type: 'example',
        id: 'basic-usage',
        title: 'Basic usage',
        description: 'Default configuration with internal state management.',
        example: {
          id: 'default-overlay-menu',
          title: 'Default overlay menu',
          description: 'Hover over or click the center icon to reveal options.',
          component: DefaultOverlayMenuExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'external-state',
        title: 'External state control',
        description:
          'Pass a WritableSignal to control the menu state from outside the component.',
        example: {
          id: 'external-state-overlay-menu',
          title: 'External state overlay menu',
          description:
            'Menu state is driven by a signal defined in the parent component.',
          component: ExternalStateOverlayMenuExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
    ],
  },
  api: {
    inputs: [
      {
        name: 'options',
        type: 'OverlayMenuOption[]',
        defaultValue: '[]',
        description: 'List of options displayed around the center trigger.',
      },
      {
        name: 'radius',
        type: 'number',
        defaultValue: '120',
        description: 'Distance in pixels from the center to each option.',
      },
      {
        name: 'spread',
        type: 'number',
        defaultValue: '160',
        description: 'Arc angle in degrees across which options are spread.',
      },
      {
        name: 'stateSignal',
        type: 'WritableSignal<OverlayMenuState> | null',
        defaultValue: 'null',
        description:
          'Optional external signal for controlling open/closed state. When provided, internal state is ignored.',
      },
    ],
    outputs: [
      {
        name: 'optionSelected',
        type: 'EventEmitter<OverlayMenuOption>',
        defaultValue: '',
        description: 'Emitted when the user clicks an option.',
      },
    ],
  },
  examples: [
    {
      id: 'default-overlay-menu',
      title: 'Default overlay menu',
      description: 'Basic usage with internal state and three options.',
      component: DefaultOverlayMenuExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'external-state-overlay-menu',
      title: 'External state control',
      description: 'Menu controlled via a WritableSignal from the parent.',
      component: ExternalStateOverlayMenuExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'custom-spread-overlay-menu',
      title: 'Custom radius and spread',
      description: 'Five options spread across 260° with radius of 160px.',
      component: CustomSpreadOverlayMenuExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
  ],
};
