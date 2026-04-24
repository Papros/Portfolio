import { Injectable, signal } from '@angular/core';
import {
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
  });

  public challange = this._challenge.asReadonly();

  public initChallenge(data: RxJSChallenge) {
    this._challenge.set(data);
  }

  //Operators
  removeOperator(index: number) {
    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        pipe: challenge.data.pipe.filter((_, i) => i !== index),
      },
    }));
  }

  addOperator(operator: PipeOperator) {
    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        pipe: [...challenge.data.pipe, operator],
      },
    }));
  }

  updateOperator(operatorIndex: number, operator: PipeOperator) {
    console.log('UPDATE Operator');

    this._challenge.update((challenge) => {
      const pipe = [...challenge.data.pipe];
      pipe[operatorIndex] = operator;

      return {
        ...challenge,
        data: {
          ...challenge.data,
          pipe: [...challenge.data.pipe],
        },
      };
    });
  }

  //Stream
  addSourceStream() {
    console.log('ADD SOURCE');

    this._challenge.update((challenge) => ({
      ...challenge,
      data: {
        ...challenge.data,
        sourceStreams: [
          ...challenge.data.sourceStreams,
          {
            stream: { label: 'result$', completeTime: 0, stream: [] },
            locked: false,
          },
        ],
      },
    }));
  }

  removeSourceStream(index: number) {
    console.log('REMOVE SOURCE');

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

  //Marble
  removeMarble(streamIndex: number, marbleIndex: number, output = false) {
    console.log('Marble removed');

    this._challenge.update((challenge) => {
      if (output) {
        const stream = challenge.data.outputStream;

        stream.stream.stream = stream.stream.stream.filter(
          (_, i) => i !== marbleIndex,
        );

        return {
          ...challenge,
          data: {
            ...challenge.data,
            outputStream: stream,
          },
        };
      } else {
        const sourceStreams = { ...challenge.data.sourceStreams };

        sourceStreams[streamIndex].stream.stream = sourceStreams[
          streamIndex
        ].stream.stream.filter((_, i) => i !== marbleIndex);

        return {
          ...challenge,
          data: {
            ...challenge.data,
            sourceStreams: sourceStreams,
          },
        };
      }
    });
  }

  addMarble(streamIndex: number, event: StreamEvent, output = false) {
    console.log('Marble added');
  }

  updateMarble(streamIndex: number, event: StreamEvent, output = false) {
    console.log('Marble update');
  }

  moveMarble(
    streamIndex: number,
    event: { index: number; newTime: number },
    output = false,
  ) {
    console.log('Marble update 2');
  }
}
