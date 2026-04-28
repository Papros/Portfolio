import { computed, Injectable, signal } from '@angular/core';
import {
  InterpreterResult,
  PipeOperator,
  RxJSChallenge,
  StreamEvent,
} from '../interfaces/challenge.interface';

@Injectable()
export class ChallengeStateService {
  private _challenge = signal<RxJSChallenge>({
    id: 0,
    title: '',
    subtitle: '',
    mode: 'pick-operator',
    sourcesLocked: true,
    data: {
      sourceStreams: [],
      pipe: [],
      outputStream: {
        locked: true,
        stream: {
          label: 'result$',
          completeTime: 0,
          stream: [],
        },
      },
    },
    operatorOptions: [],
    resoult: undefined,
  });

  public challenge = this._challenge.asReadonly();

  public initChallenge(data: RxJSChallenge) {
    this._challenge.set(data);
    console.log('Init challenge: ', data.id);
  }

  private updateSourceStream(
    challenge: RxJSChallenge,
    streamIndex: number,
    updater: (events: StreamEvent[]) => StreamEvent[],
  ): RxJSChallenge {
    return {
      ...challenge,
      data: {
        ...challenge.data,
        sourceStreams: challenge.data.sourceStreams.map((src, i) =>
          i !== streamIndex
            ? src
            : {
                ...src,
                stream: {
                  ...src.stream,
                  stream: updater(src.stream.stream),
                },
              },
        ),
      },
    };
  }

  private updateOutputStream(
    challenge: RxJSChallenge,
    updater: (events: StreamEvent[]) => StreamEvent[],
  ): RxJSChallenge {
    return {
      ...challenge,
      data: {
        ...challenge.data,
        outputStream: {
          ...challenge.data.outputStream,
          stream: {
            ...challenge.data.outputStream.stream,
            stream: updater(challenge.data.outputStream.stream.stream),
          },
        },
      },
    };
  }

  setOutputStreamResult(resoult: InterpreterResult) {
    this._challenge.update((challenge) => ({
      ...challenge,
      resoult: resoult,
    }));
  }

  private sorted(events: StreamEvent[]): StreamEvent[] {
    return [...events].sort((a, b) => a.timeInterval - b.timeInterval);
  }

  // Operators

  addOperator(operator: PipeOperator): void {
    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        pipe: [...challenge.data.pipe, operator],
      },
    }));
  }

  updateOperator(operatorIndex: number, operator: PipeOperator): void {
    this._challenge.update((challenge) => {
      const pipe = [...challenge.data.pipe];
      pipe[operatorIndex] = operator;
      return {
        ...challenge,
        data: { ...challenge.data, pipe },
      };
    });
  }

  removeOperator(index: number): void {
    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        pipe: challenge.data.pipe.filter((_, i) => i !== index),
      },
    }));
  }

  // Stream

  addSourceStream(): void {
    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        sourceStreams: [
          ...challenge.data.sourceStreams,
          {
            locked: false,
            stream: {
              label: `source${challenge.data.sourceStreams.length + 1}$`,
              completeTime: null,
              stream: [],
            },
          },
        ],
      },
    }));
  }

  removeSourceStream(index: number): void {
    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        sourceStreams: challenge.data.sourceStreams.filter(
          (_, i) => i !== index,
        ),
      },
    }));
  }

  // Marble

  addMarble(streamIndex: number, event: StreamEvent, output = false): void {
    this._challenge.update((challenge) =>
      output
        ? this.updateOutputStream(challenge, (events) =>
            this.sorted([...events, event]),
          )
        : this.updateSourceStream(challenge, streamIndex, (events) =>
            this.sorted([...events, event]),
          ),
    );
  }

  removeMarble(streamIndex: number, marbleIndex: number, output = false): void {
    this._challenge.update((challenge) =>
      output
        ? this.updateOutputStream(challenge, (events) =>
            events.filter((_, i) => i !== marbleIndex),
          )
        : this.updateSourceStream(challenge, streamIndex, (events) =>
            events.filter((_, i) => i !== marbleIndex),
          ),
    );
  }

  updateMarble(
    streamIndex: number,
    marbleIndex: number,
    updated: StreamEvent,
    output = false,
  ): void {
    this._challenge.update((challenge) =>
      output
        ? this.updateOutputStream(challenge, (events) =>
            this.sorted(
              events.map((e, i) => (i !== marbleIndex ? e : updated)),
            ),
          )
        : this.updateSourceStream(challenge, streamIndex, (events) =>
            this.sorted(
              events.map((e, i) => (i !== marbleIndex ? e : updated)),
            ),
          ),
    );
  }

  moveMarble(
    streamIndex: number,
    ev: { index: number; newTime: number },
    output = false,
  ): void {
    this._challenge.update((challenge) =>
      output
        ? this.updateOutputStream(challenge, (events) =>
            events.map((e, i) =>
              i !== ev.index ? e : { ...e, timeInterval: ev.newTime },
            ),
          )
        : this.updateSourceStream(challenge, streamIndex, (events) =>
            events.map((e, i) =>
              i !== ev.index ? e : { ...e, timeInterval: ev.newTime },
            ),
          ),
    );
  }

  commitMarbleMove(
    streamIndex: number,
    marbleIndex: number,
    output = false,
  ): void {
    this._challenge.update((challenge) =>
      output
        ? this.updateOutputStream(challenge, (events) => this.sorted(events))
        : this.updateSourceStream(challenge, streamIndex, (events) =>
            this.sorted(events),
          ),
    );
  }
}
