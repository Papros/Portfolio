import { ComponentDoc } from './component-details.interface';
import { DefaultOverlayMenuExampleComponent } from '@docs/overlay-menu';

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    id: 'overlay-menu',
    meta: {
      title: 'Overlay Menu',
      description:
        'Menu component that appears as an overlay. Gives quick access to necessary actions.',
      thumbnail: 'assets/images/component-demo/overlay-menu-icon.png',
    },
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
            id: 'default-overlay-menu',
            title: 'Overlay Menu Example',
            description:
              'An example showcasing the basic usage of the overlay menu component.',
            component: DefaultOverlayMenuExampleComponent,
            source: {
              ts: '/libs/docs/overlay-menu/default-overlay-menu/default-overlay-menu.example.component.ts',
              html: '/libs/docs/overlay-menu/default-overlay-menu/default-overlay-menu.example.component.html',
              scss: '/libs/docs/overlay-menu/default-overlay-menu/default-overlay-menu.example.component.scss',
            },
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
        id: 'default-overlay-menu',
        title: 'Default Overlay Menu',
        description:
          'An example demonstrating the default overlay menu functionality.',
        component: DefaultOverlayMenuExampleComponent,
        source: {
          ts: '/libs/docs/overlay-menu/default-overlay-menu/default-overlay-menu.example.component.ts',
          html: '/libs/docs/overlay-menu/default-overlay-menu/default-overlay-menu.example.component.html',
          scss: '/libs/docs/overlay-menu/default-overlay-menu/default-overlay-menu.example.component.scss',
        },
      },
    ],
  },
];

export const COMPONENT_DOC_MAP = new Map(
  COMPONENT_DOCS.map((doc) => [doc.id, doc]),
);
