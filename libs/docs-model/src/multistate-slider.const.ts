import {
  BasicMultistateSliderExampleComponent,
  CollapsibleHoverMultistateSliderExampleComponent,
  CollapsibleClickMultistateSliderExampleComponent,
  ProjectedOptionsMultistateSliderExampleComponent,
  ViewToggleMultistateSliderExampleComponent,
  UnitConverterMultistateSliderExampleComponent,
} from '@docs/multistate-slider';
import { ComponentDoc } from './component-details.interface';

export const multistateSliderDoc: ComponentDoc = {
  id: 'multistate-slider',
  meta: {
    id: 'multistate-slider',
    title: 'Multistate Slider',
    description:
      'A segmented control for selecting one value from a fixed set. Supports icons, projected content, and collapsible expand modes.',
    thumbnail: 'assets/images/component-demo/multistate-slider-icon.png',
  },
  overview: {
    sections: [
      {
        type: 'markdown',
        id: 'overview',
        title: 'Overview',
        content:
          'MultistateSlider is a segmented control that lets the user pick one option from a fixed set. ' +
          'Options can be defined via the `options` input or projected as `pipr-slider-option` children for custom templates. ' +
          'The slider supports three expand modes: always visible, expand on hover, and expand on click. ' +
          'In collapsible modes only the selected option is shown when collapsed.',
      },
      {
        type: 'example',
        id: 'basic-usage',
        title: 'Basic usage',
        description:
          'Always-visible slider with icons passed via the `options` input.',
        example: {
          id: 'basic-multistate-slider',
          title: 'Basic multistate slider',
          description: 'Select a theme using icon options.',
          component: BasicMultistateSliderExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'markdown',
        id: 'projected-content',
        title: 'Projected content',
        content:
          'Instead of the `options` input you can project `pipr-slider-option` elements as children. ' +
          'Each child becomes a fully custom template - useful for icons from icon fonts, images, or any inline HTML.\n\n' +
          '```html\n' +
          '<pipr-multistate-slider>\n' +
          '  <pipr-slider-option [value]="\'light\'">\n' +
          '    <mat-icon>light_mode</mat-icon>\n' +
          '  </pipr-slider-option>\n' +
          '  <pipr-slider-option [value]="\'dark\'">\n' +
          '    <mat-icon>dark_mode</mat-icon>\n' +
          '  </pipr-slider-option>\n' +
          '</pipr-multistate-slider>\n' +
          '```',
      },
      {
        type: 'example',
        id: 'projected-options',
        title: 'Projected options',
        description: 'Custom templates via pipr-slider-option children.',
        example: {
          id: 'projected-options-multistate-slider',
          title: 'Projected options',
          description: 'Each option uses a projected mat-icon template.',
          component: ProjectedOptionsMultistateSliderExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'collapsible-hover',
        title: 'Collapsible - hover',
        description:
          'Only the selected option is visible when collapsed. The slider expands on mouseenter and collapses on mouseleave.',
        example: {
          id: 'collapsible-hover-multistate-slider',
          title: 'Hover expand',
          description: 'Hover over the slider to reveal all options.',
          component: CollapsibleHoverMultistateSliderExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'collapsible-click',
        title: 'Collapsible - click',
        description:
          'Expands on click. Collapses when an option is selected or the user clicks outside.',
        example: {
          id: 'collapsible-click-multistate-slider',
          title: 'Click expand',
          description:
            'Click the slider to expand, select or click outside to collapse.',
          component: CollapsibleClickMultistateSliderExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'markdown',
        id: 'real-world',
        title: 'Real-world usage',
        content:
          'The slider works well beyond simple theme or language selectors. ' +
          'It suits any scenario where the user picks one option from a short, fixed set - ' +
          'especially when those options benefit from a compact, always-visible control rather than a dropdown.',
      },
      {
        type: 'example',
        id: 'view-toggle',
        title: 'View toggle',
        description:
          'Switch between grid, list and compact layout. The slider drives a real layout change below it.',
        example: {
          id: 'view-toggle-multistate-slider',
          title: 'View toggle',
          description:
            'Select a layout mode to change how items are displayed.',
          component: ViewToggleMultistateSliderExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'unit-converter',
        title: 'Unit converter',
        description:
          'Text-only options with live value conversion. No icons needed.',
        example: {
          id: 'unit-converter-multistate-slider',
          title: 'Unit converter',
          description:
            'Switch units to convert distance, temperature and currency on the fly.',
          component: UnitConverterMultistateSliderExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
    ],
  },
  api: {
    inputs: [
      {
        name: 'options',
        type: 'SliderOption<T>[]',
        defaultValue: '[]',
        description:
          'List of options to display. Each option must have a value and optionally an icon (raw HTML string) or label. Ignored when pipr-slider-option children are projected.',
      },
      {
        name: 'value',
        type: 'T',
        defaultValue: 'undefined',
        description:
          'Currently selected value. Drives the selected index reactively via a signal effect.',
      },
      {
        name: 'config',
        type: 'SliderConfig',
        defaultValue: '{}',
        description:
          'Configuration object controlling expand mode, expand direction, overlay behaviour, and size.',
      },
    ],
    outputs: [
      {
        name: 'valueChange',
        type: 'T',
        defaultValue: '',
        description:
          'Emitted when the user selects an option. Carries the new value.',
      },
    ],
  },
  examples: [
    {
      id: 'basic-multistate-slider',
      title: 'Basic multistate slider',
      description: 'Always-visible slider with icon options.',
      component: BasicMultistateSliderExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'projected-options-multistate-slider',
      title: 'Projected options',
      description: 'Custom option templates via pipr-slider-option.',
      component: ProjectedOptionsMultistateSliderExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'collapsible-hover-multistate-slider',
      title: 'Hover expand',
      description: 'Collapses to selected option, expands on hover.',
      component: CollapsibleHoverMultistateSliderExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'collapsible-click-multistate-slider',
      title: 'Click expand',
      description: 'Collapses to selected option, expands on click.',
      component: CollapsibleClickMultistateSliderExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'view-toggle-multistate-slider',
      title: 'View toggle',
      description: 'Drives a real grid/list/compact layout change.',
      component: ViewToggleMultistateSliderExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'unit-converter-multistate-slider',
      title: 'Unit converter',
      description: 'Text-only options with live unit conversion.',
      component: UnitConverterMultistateSliderExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
  ],
};
