import { ComponentDoc } from './component-details.interface';
import {
  DefaultOverlayMenuExampleComponent,
  DEFAULT_OVERLAY_MENU_EXAMPLE_CODE,
} from '@docs/overlay-menu';

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    id: 'overlay-menu',
    title: 'Overlay Menu',
    description:
      'Menu component that appears as an overlay. Gives quick access to necessary actions.',
    overview: {
      sections: [
        {
          type: 'markdown',
          id: 'overview',
          title: 'Overview',
          content: 'This is an overlay menu component used for quick actions.',
        },
        {
          type: 'example',
          id: 'basic-usage',
          title: 'Basic Usage',
          description: 'A simple example of the overlay menu in action.',
          example: {
            title: 'Overlay Menu Example',
            description: '',
            component: DefaultOverlayMenuExampleComponent,
          },
        },
      ],
    },
    api: {
      inputs: [
        {
          name: 'menuState',
          type: 'OverlayMenuState',
          defaultValue: 'OverlayMenuState.CLOSED',
          description: 'Controls the state of the menu (open, closed, toggle).',
        },
        {
          name: 'label',
          type: 'string',
          defaultValue: 'Menu',
          description: 'Label for the menu.',
        },
        {
          name: 'icon',
          type: 'string',
          defaultValue: 'donut_small',
          description: 'Icon for the menu.',
        },
      ],
      outputs: [],
    },
    examples: [
      {
        title: 'Default Overlay Menu',
        description:
          'An example demonstrating the default overlay menu functionality.',
        component: DefaultOverlayMenuExampleComponent,
        source: {
          ts: DEFAULT_OVERLAY_MENU_EXAMPLE_CODE.ts,
          html: DEFAULT_OVERLAY_MENU_EXAMPLE_CODE.html,
          scss: DEFAULT_OVERLAY_MENU_EXAMPLE_CODE.scss,
        },
      },
    ],
  },
];
