import {
  OperatorParam,
  RxJSOperatorName,
} from '../interfaces/challenge.interface';

export type OperatorKind = 'pipeable' | 'combination';

export interface OperatorMeta {
  kind: OperatorKind;
  params: OperatorParam[];
  requiresMultipleSources?: boolean; // forkJoin/zip/combineLatest wymagają >1 źródła
  hasCallback?: boolean; // czy kod to callback (map) czy wartość (take)
}

export const OPERATOR_METADATA: Partial<
  Record<RxJSOperatorName, OperatorMeta>
> = {
  map: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'data', type: 'T', description: 'Emitowana wartość' },
      { name: 'index', type: 'number', description: 'Indeks emisji (0-based)' },
    ],
  },
  filter: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'data', type: 'T', description: 'Emitowana wartość' },
      { name: 'index', type: 'number', description: 'Indeks emisji' },
    ],
  },
  tap: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      {
        name: 'data',
        type: 'T',
        description: 'Emitowana wartość (side-effect only)',
      },
    ],
  },
  take: {
    kind: 'pipeable',
    hasCallback: false,
    params: [
      {
        name: 'count',
        type: 'number',
        description: 'Liczba emisji do przepuszczenia',
      },
    ],
  },
  skip: {
    kind: 'pipeable',
    hasCallback: false,
    params: [
      {
        name: 'count',
        type: 'number',
        description: 'Liczba emisji do pominięcia',
      },
    ],
  },
  switchMap: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'data', type: 'T', description: 'Emitowana wartość' },
      { name: 'index', type: 'number', description: 'Indeks emisji' },
    ],
  },
  mergeMap: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'data', type: 'T', description: 'Emitowana wartość' },
      { name: 'index', type: 'number', description: 'Indeks emisji' },
    ],
  },
  concatMap: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'data', type: 'T', description: 'Emitowana wartość' },
      { name: 'index', type: 'number', description: 'Indeks emisji' },
    ],
  },
  exhaustMap: {
    kind: 'pipeable',
    hasCallback: true,
    params: [{ name: 'data', type: 'T', description: 'Emitowana wartość' }],
  },
  catchError: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'error', type: 'unknown', description: 'Błąd ze strumienia' },
      {
        name: 'caught$',
        type: 'Observable<T>',
        description: 'Oryginalny strumień',
      },
    ],
  },
  retry: {
    kind: 'pipeable',
    hasCallback: false,
    params: [
      { name: 'count', type: 'number', description: 'Liczba ponownych prób' },
    ],
  },
  takeUntil: {
    kind: 'pipeable',
    hasCallback: false,
    params: [
      {
        name: 'notifier$',
        type: 'Observable',
        description: 'Strumień kończący',
      },
    ],
  },
  debounceTime: {
    kind: 'pipeable',
    hasCallback: false,
    params: [{ name: 'ms', type: 'number', description: 'Czas debounce w ms' }],
  },
  throttleTime: {
    kind: 'pipeable',
    hasCallback: false,
    params: [{ name: 'ms', type: 'number', description: 'Czas throttle w ms' }],
  },
  distinctUntilChanged: {
    kind: 'pipeable',
    hasCallback: true,
    params: [
      { name: 'prev', type: 'T', description: 'Poprzednia wartość' },
      { name: 'curr', type: 'T', description: 'Aktualna wartość' },
    ],
  },
  withLatestFrom: {
    kind: 'pipeable',
    hasCallback: false,
    requiresMultipleSources: true,
    params: [],
  },

  combineLatest: {
    kind: 'combination',
    requiresMultipleSources: true,
    hasCallback: false,
    params: [],
  },
  zip: {
    kind: 'combination',
    requiresMultipleSources: true,
    hasCallback: false,
    params: [],
  },
  merge: {
    kind: 'combination',
    requiresMultipleSources: false,
    hasCallback: false,
    params: [],
  },
  forkJoin: {
    kind: 'combination',
    requiresMultipleSources: true,
    hasCallback: false,
    params: [],
  },
};
