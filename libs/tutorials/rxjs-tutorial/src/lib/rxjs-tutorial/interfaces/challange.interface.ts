export interface RxJSChallenge {
  id: number;
  title: string;
  subtitle?: string;
  data: {
    sourceStream: StreamData[];
    pipe: PipeOperator[];
    outputStream: StreamData;
  };
}

export interface PipeOperator {
  operator: 'filter' | 'switchMap';
  code: string;
}

export interface StreamEvent {
  timeInterval: number;
  label: string;
}

export interface StreamNextEvent extends StreamEvent {
  data: object;
}

export interface StreamCompleteEvent extends StreamEvent {
  complete: boolean;
}

export interface StreamData {
  label: string;
  stream: StreamEvent[];
  completeTime: number;
}
