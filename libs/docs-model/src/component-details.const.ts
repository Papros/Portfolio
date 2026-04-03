import { ComponentDoc } from './component-details.interface';
import { overlayMenuDoc } from './overlay-menu.const';
import { multistateSliderDoc } from './multistate-slider.const';

export const COMPONENT_DOCS: ComponentDoc[] = [
  overlayMenuDoc,
  multistateSliderDoc,
];

export const COMPONENT_DOC_MAP = new Map(
  COMPONENT_DOCS.map((doc) => [doc.id, doc]),
);
