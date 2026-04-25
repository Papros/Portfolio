import { RxJSChallenge } from '../interfaces/challenge.interface';

// Challenge 1: pick-operator - map
// Użytkownik widzi źródło i output, musi wybrać operator.
export const CHALLENGE_MAP: RxJSChallenge = {
  id: 1,
  title: 'Double every value',
  subtitle: 'Wybierz operator który mnoży każdą emitowaną wartość przez 2.',
  mode: 'pick-operator',
  sourcesLocked: true,
  data: {
    sourceStreams: [
      {
        locked: true,
        stream: {
          label: 'source$',
          completeTime: 90,
          stream: [
            { type: 'next', timeInterval: 10, label: '1' },
            { type: 'next', timeInterval: 25, label: '2' },
            { type: 'next', timeInterval: 50, label: '3' },
            { type: 'next', timeInterval: 75, label: '4' },
          ],
        },
      },
    ],
    pipe: [{ operator: 'map', code: '???', locked: false }],
    outputStream: {
      locked: true,
      stream: {
        label: 'result$',
        completeTime: 90,
        stream: [
          { type: 'next', timeInterval: 10, label: '2' },
          { type: 'next', timeInterval: 25, label: '4' },
          { type: 'next', timeInterval: 50, label: '6' },
          { type: 'next', timeInterval: 75, label: '8' },
        ],
      },
    },
  },
  operatorOptions: ['map', 'filter', 'tap', 'switchMap'],
};

// Challenge 2: pick-operator - filter
export const CHALLENGE_FILTER: RxJSChallenge = {
  id: 2,
  title: 'Keep only even numbers',
  subtitle: 'Przepuść tylko parzyste wartości. Nieparzyste powinny zniknąć.',
  mode: 'pick-operator',
  sourcesLocked: true,
  data: {
    sourceStreams: [
      {
        locked: true,
        stream: {
          label: 'source$',
          completeTime: 95,
          stream: [
            { type: 'next', timeInterval: 10, label: '1' },
            { type: 'next', timeInterval: 20, label: '2' },
            { type: 'next', timeInterval: 40, label: '3' },
            { type: 'next', timeInterval: 60, label: '4' },
            { type: 'next', timeInterval: 80, label: '5' },
          ],
        },
      },
    ],
    pipe: [{ operator: 'filter', code: 'x => x % 2 === 0', locked: false }],
    outputStream: {
      locked: true,
      stream: {
        label: 'result$',
        completeTime: 95,
        stream: [
          { type: 'next', timeInterval: 20, label: '2' },
          { type: 'next', timeInterval: 60, label: '4' },
        ],
      },
    },
  },
  operatorOptions: ['filter', 'map', 'take', 'distinctUntilChanged'],
};

// Challenge 3: pick-operator - combineLatest (dwa źródła)
export const CHALLENGE_COMBINE_LATEST: RxJSChallenge = {
  id: 3,
  title: 'Combine two streams',
  subtitle:
    'Połącz dwa źródła tak, żeby każda emisja z dowolnego dała parę [latest A, latest B].',
  mode: 'pick-operator',
  sourcesLocked: true,
  data: {
    sourceStreams: [
      {
        locked: true,
        stream: {
          label: 'a$',
          completeTime: 95,
          stream: [
            { type: 'next', timeInterval: 10, label: 'A1' },
            { type: 'next', timeInterval: 45, label: 'A2' },
            { type: 'next', timeInterval: 80, label: 'A3' },
          ],
        },
      },
      {
        locked: true,
        stream: {
          label: 'b$',
          completeTime: 95,
          stream: [
            { type: 'next', timeInterval: 25, label: 'B1' },
            { type: 'next', timeInterval: 60, label: 'B2' },
            { type: 'next', timeInterval: 85, label: 'B3' },
          ],
        },
      },
    ],
    pipe: [{ operator: 'combineLatest', locked: false }],
    outputStream: {
      locked: true,
      stream: {
        label: 'result$',
        completeTime: 95,
        stream: [
          { type: 'next', timeInterval: 25, label: 'A1B1' },
          { type: 'next', timeInterval: 45, label: 'A2B1' },
          { type: 'next', timeInterval: 60, label: 'A2B2' },
          { type: 'next', timeInterval: 80, label: 'A3B2' },
          { type: 'next', timeInterval: 85, label: 'A3B3' },
        ],
      },
    },
  },
  operatorOptions: ['combineLatest', 'zip', 'merge', 'forkJoin'],
};

// Challenge 4: fill-source - reverse engineer
// Operator i output są znane, użytkownik musi odgadnąć dane wejściowe.
export const CHALLENGE_FILL_SOURCE: RxJSChallenge = {
  id: 4,
  title: 'Reverse engineer the source',
  subtitle:
    'Wiesz że operator to filter(x > 2), a wynik to [3, 4]. Jakie były dane wejściowe?',
  mode: 'fill-source',
  sourcesLocked: false,
  data: {
    sourceStreams: [
      {
        locked: false, // użytkownik edytuje
        stream: {
          label: 'source$',
          completeTime: null,
          stream: [], // do wypełnienia
        },
      },
    ],
    pipe: [{ operator: 'filter', code: 'x => x > 2', locked: true }],
    outputStream: {
      locked: true,
      stream: {
        label: 'result$',
        completeTime: 80,
        stream: [
          { type: 'next', timeInterval: 30, label: '3' },
          { type: 'next', timeInterval: 60, label: '4' },
        ],
      },
    },
  },
};

// Challenge 5: catch-error
export const CHALLENGE_CATCH_ERROR: RxJSChallenge = {
  id: 5,
  title: 'Handle the error',
  subtitle:
    'Strumień rzuca błędem w 60ms. Obsłuż go i zastąp wartością "fallback".',
  mode: 'pick-operator',
  sourcesLocked: true,
  data: {
    sourceStreams: [
      {
        locked: true,
        stream: {
          label: 'source$',
          completeTime: null,
          stream: [
            { type: 'next', timeInterval: 15, label: 'A' },
            { type: 'next', timeInterval: 35, label: 'B' },
            { type: 'error', timeInterval: 60, label: '✕' },
          ],
        },
      },
    ],
    pipe: [{ operator: 'catchError', code: "() => of('fb')", locked: false }],
    outputStream: {
      locked: true,
      stream: {
        label: 'result$',
        completeTime: 60,
        stream: [
          { type: 'next', timeInterval: 15, label: 'A' },
          { type: 'next', timeInterval: 35, label: 'B' },
          { type: 'next', timeInterval: 60, label: 'fb' },
        ],
      },
    },
  },
  operatorOptions: ['catchError', 'retry', 'tap'],
};

export const CHALLENGE_PLAYGROUND: RxJSChallenge = {
  id: 6,
  title: 'Playgtound',
  subtitle: 'Testuj strumienie".',
  mode: 'playground',
  sourcesLocked: false,
  data: {
    sourceStreams: [
      {
        locked: false,
        stream: {
          label: 'source$',
          completeTime: null,
          stream: [
            { type: 'next', timeInterval: 15, label: 'A' },
            { type: 'next', timeInterval: 35, label: 'B' },
            { type: 'error', timeInterval: 60, label: '✕' },
          ],
        },
      },
    ],
    pipe: [{ operator: 'catchError', code: "() => of('fb')", locked: false }],
    outputStream: {
      locked: false,
      stream: {
        label: 'result$',
        completeTime: 60,
        stream: [
          { type: 'next', timeInterval: 15, label: 'A' },
          { type: 'next', timeInterval: 35, label: 'B' },
          { type: 'next', timeInterval: 60, label: 'fb' },
        ],
      },
    },
  },
  operatorOptions: ['catchError', 'retry', 'tap'],
};

export const ALL_CHALLENGES: RxJSChallenge[] = [
  CHALLENGE_MAP,
  CHALLENGE_FILTER,
  CHALLENGE_COMBINE_LATEST,
  CHALLENGE_FILL_SOURCE,
  CHALLENGE_CATCH_ERROR,
  CHALLENGE_PLAYGROUND,
];
