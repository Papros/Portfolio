export interface AttachedComponentPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export enum AttachedComponentBackdrop {
  Transparent = 'cdk-overlay-transparent-backdrop',
  Dark = 'cdk-overlay-dark-backdrop',
}

export type ComponentInputs<T> = Partial<T>;

export type ComponentInputs2<T> = Partial<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>
>;
