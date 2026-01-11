export interface GridMenuConfig {
  items: GridItemConfig[];
  gridWidth: number;
  gridHeight: number;
}

export interface GridItemConfig {
  id: string;
  options: GridItemOptions;
  position: GridItemPosition;
  label: GridLabelConfig;
}

export interface GridItemOptions {
  enabled: boolean;
  visible: boolean;
  background: string;
}

export interface GridLabelConfig {
  value: string;
  shadow: boolean;
  positionHorizontal: GridLabelOptions;
  positionVertical: GridLabelOptions;
}

export interface GridItemPosition {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
}

export enum GridLabelOptions {
  START,
  CENTER,
  END,
}
