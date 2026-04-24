//-------- Operators ----------

export type RxJSOperatorName =
  | 'map'
  | 'filter'
  | 'tap'
  | 'take'
  | 'skip'
  | 'switchMap'
  | 'mergeMap'
  | 'concatMap'
  | 'exhaustMap'
  | 'catchError'
  | 'retry'
  | 'takeUntil'
  | 'debounceTime'
  | 'throttleTime'
  | 'distinctUntilChanged'
  | 'combineLatest'
  | 'zip'
  | 'merge'
  | 'forkJoin'
  | 'withLatestFrom';

export interface PipeOperator {
  operator: RxJSOperatorName;
  code?: string;
  locked: boolean;
}

//-------- Challenge ----------

export type ChallengeMode = 'pick-operator' | 'fill-source' | 'guess-output';

export interface RxJSChallenge {
  id: number;
  title: string;
  subtitle?: string;
  mode: ChallengeMode;
  sourcesLocked: boolean;
  data: {
    sourceStreams: { stream: StreamData; locked: boolean }[];
    pipe: PipeOperator[];
    outputStream: { stream: StreamData; locked: boolean };
  };
  operatorOptions?: RxJSOperatorName[];
}

//-------- Events ---------

export interface StreamBasicEvent {
  type: any;
  timeInterval: number;
  label: string;
}

export interface StreamNextEvent extends StreamBasicEvent {
  type: 'next';
  data?: object;
  timeInterval: number;
  label: string;
}

export interface StreamCompleteEvent extends StreamBasicEvent {
  type: 'complete';
  label: '|';
  timeInterval: number;
}

export interface StreamErrorEvent {
  type: 'error';
  timeInterval: number;
  label: string;
}

export type StreamEvent =
  | StreamNextEvent
  | StreamCompleteEvent
  | StreamErrorEvent;

//----------- Stream ----------------

export interface StreamData {
  label: string;
  stream: StreamEvent[];
  completeTime: number | null;
}

//---------- UI State -------------

export type PanelFocus =
  | { kind: 'source'; index: number; marbleIndex?: number }
  | { kind: 'pipe'; operatorIndex?: number }
  | { kind: 'output'; marbleIndex?: number }
  | null;
