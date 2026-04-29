import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  merge,
  zip,
  combineLatest,
  forkJoin,
  of,
  throwError,
  timer,
  EMPTY,
  OperatorFunction,
} from 'rxjs';
import {
  map,
  filter,
  tap,
  take,
  skip,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
  catchError,
  retry,
  takeUntil,
  debounceTime,
  throttleTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import {
  RxJSChallenge,
  StreamData,
  StreamEvent,
  PipeOperator,
  StreamNextEvent,
  InterpreterResult,
} from '../interfaces/challenge.interface';
import { OPERATOR_METADATA } from '../interfaces/operator-meta.const';

// ----------------------------------------------------------------
// TYPY POMOCNICZE
// ----------------------------------------------------------------

// Kontekst dostępny w kodzie użytkownika przez Function constructor
const USER_CODE_CONTEXT = {
  of,
  throwError,
  timer,
  EMPTY,
};

// Wartość przepływająca przez strumień.
type StreamValue = unknown;

// Callback budowany z kodu użytkownika (np. "data => data * 2").
type UserCallback = (...args: StreamValue[]) => StreamValue;

//Operator RxJS gotowy do wrzucenia w .pipe().
type AnyOperator = OperatorFunction<StreamValue, StreamValue>;

export interface ChallengeWeights {
  values: number;
  timing: number;
  sequence: number;
  count: number;
  completion: number;
}

export interface ChallengeResoults {
  stars: number;
  score: number;
  feedback: { msg: string; type: 'success' | 'warn' | 'error' }[];
}

// ----------------------------------------------------------------
// SERWIS
// ----------------------------------------------------------------

@Injectable()
export class ChallengeInterpreterService {
  /**
   * Uruchamia interpreter na danych challenge i zwraca wynik jako Promise,
   */
  run(challenge: RxJSChallenge, maxTime: number): Promise<InterpreterResult> {
    return new Promise((resolve) => {
      try {
        // source sream zamieniany na observable, emisja wartości po odpowiednich timeoutach (symulacja czasu).
        const sources$ = challenge.data.sourceStreams.map((s) =>
          this.buildSourceObservable(s.stream),
        );

        const output$ = this.buildOutputObservable(
          sources$,
          challenge.data.pipe,
        );

        const result: StreamEvent[] = [];
        const startTime = Date.now();
        let completeTime: number | null = null;

        output$.subscribe({
          next: (value) => {
            const elapsed = Date.now() - startTime;
            const timeInterval = Math.round((elapsed / maxTime) * maxTime);
            result.push({
              type: 'next',
              timeInterval: Math.min(timeInterval, maxTime),
              label: String(value),
            });
          },
          error: (err) => {
            const elapsed = Date.now() - startTime;
            result.push({
              type: 'error',
              timeInterval: Math.min(Math.round(elapsed), maxTime),
              label: String(err?.message ?? err),
            });
            // Błąd kończy strumień — resolve'ujemy z error polem ustawionym.
            resolve({
              stream: result,
              completeTime: null,
              error: String(err),
              time: Date.now(),
            });
          },
          complete: () => {
            completeTime = Math.min(Date.now() - startTime, maxTime);
            resolve({ stream: result, completeTime, time: Date.now() });
          },
        });
      } catch (err: unknown) {
        // synchroniczny catch (np. błąd parsowania kodu)
        resolve({
          stream: [],
          completeTime: null,
          error: err instanceof Error ? err.message : String(err),
          time: Date.now(),
        });
      }
    });
  }

  // - Source Observable ---

  /**
   * Zamienia statyczne dane na Observable który emituje je po odpowiednich opóźnieniach (setTimeout).
   * @param streamData lista eventów z timeInterval
   * @returns Observable<unknown> który będzie emitować dane z source
   */
  private buildSourceObservable(
    streamData: StreamData,
  ): Observable<StreamValue> {
    return new Observable((subscriber) => {
      const timers: ReturnType<typeof setTimeout>[] = [];

      // sortujemy na wypadek gdyby dane nie były posortowane
      const sorted = [...streamData.stream].sort(
        (a, b) => a.timeInterval - b.timeInterval,
      );

      for (const event of sorted) {
        if (event.type === 'next') {
          const t = setTimeout(() => {
            if (subscriber.closed) return;
            subscriber.next(this.parseValue(event.label));
          }, event.timeInterval);
          timers.push(t);
        }

        if (event.type === 'error') {
          const t = setTimeout(() => {
            if (subscriber.closed) return;
            subscriber.error(new Error(event.label));
          }, event.timeInterval);
          timers.push(t);
        }
      }

      if (streamData.completeTime !== null) {
        const t = setTimeout(() => {
          if (!subscriber.closed) subscriber.complete();
        }, streamData.completeTime);
        timers.push(t);
      }

      // cleanup przy unsubscribe na potrzeby switchMap/takeUntil
      return () => timers.forEach(clearTimeout);
    });
  }

  // - Output Observable ---

  /**
   * Łączy sources$ i operators w jeden Observable wyjściowy.
   * @param sources$
   * @param operators
   * @returns
   */
  private buildOutputObservable(
    sources$: Observable<unknown>[],
    operators: PipeOperator[],
  ): Observable<unknown> {
    if (operators.length === 0) {
      // Brak operatorów — zwróć źródła bezpośrednio.
      return sources$.length === 1 ? sources$[0] : merge(...sources$);
    }

    // sprawdź czy pierwszy operator to combination
    const firstOp = operators[0];
    const firstMeta = OPERATOR_METADATA[firstOp.operator];

    if (firstMeta?.kind === 'combination') {
      // Combination operator opakowuje WSZYSTKIE sources$ naraz.
      const combined$ = this.buildCombinationOperator(firstOp, sources$);

      // reszta operatorów po combination idzie do pipe()
      const rest = operators.slice(1);
      return rest.length > 0
        ? this.applyPipeableOperators(combined$, rest)
        : combined$;
    }

    // brak combination - source to pierwszy strumień, reszta przez pipe()
    const source$ = sources$.length === 1 ? sources$[0] : merge(...sources$);
    return this.applyPipeableOperators(source$, operators);
  }

  // - Combination operators ---

  private buildCombinationOperator(
    op: PipeOperator,
    sources$: Observable<unknown>[],
  ): Observable<unknown> {
    switch (op.operator) {
      case 'combineLatest':
        return combineLatest(sources$) as Observable<unknown>;
      case 'zip':
        return zip(...sources$) as Observable<unknown>;
      case 'forkJoin':
        return forkJoin(sources$) as Observable<unknown>;
      case 'merge':
        return merge(...sources$);
      default:
        return merge(...sources$);
    }
  }

  // - Pipeable operators --

  private applyPipeableOperators(
    source$: Observable<unknown>,
    operators: PipeOperator[],
  ): Observable<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rxjsPipes: any[] = operators.map((op) =>
      this.buildPipeableOperator(op),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (source$ as any).pipe(...rxjsPipes);
  }

  private buildPipeableOperator(op: PipeOperator) {
    const meta = OPERATOR_METADATA[op.operator];
    const paramNames = meta?.params.map((p) => p.name) ?? ['data'];
    const code = op.code ?? '';

    switch (op.operator) {
      case 'map':
        return map(this.buildCallback(paramNames, code));

      case 'filter':
        return filter(
          this.buildCallback(paramNames, code) as (v: unknown) => boolean,
        );

      case 'tap':
        return tap(this.buildCallback(paramNames, code));

      case 'take':
        return take(Number(code) || 1);

      case 'skip':
        return skip(Number(code) || 0);

      case 'switchMap':
        return switchMap(
          this.buildCallback(paramNames, code) as () => Observable<unknown>,
        );

      case 'mergeMap':
        return mergeMap(
          this.buildCallback(paramNames, code) as () => Observable<unknown>,
        );

      case 'concatMap':
        return concatMap(
          this.buildCallback(paramNames, code) as () => Observable<unknown>,
        );

      case 'exhaustMap':
        return exhaustMap(
          this.buildCallback(paramNames, code) as () => Observable<unknown>,
        );

      case 'catchError':
        return catchError(
          this.buildCallback(paramNames, code) as () => Observable<unknown>,
        );

      case 'retry':
        return retry(Number(code) || 1);

      case 'debounceTime':
        return debounceTime(Number(code) || 0);

      case 'throttleTime':
        return throttleTime(Number(code) || 0);

      case 'distinctUntilChanged':
        return code
          ? distinctUntilChanged(
              this.buildCallback(paramNames, code) as (
                a: unknown,
                b: unknown,
              ) => boolean,
            )
          : distinctUntilChanged();

      default:
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return tap(() => {}); // no-op dla nieznanych
    }
  }

  // - Helpers ---

  /**
   * Buduje funkcję z kodu użytkownika.
   * Kod może być:
   *   - wyrażeniem:  "data * 2"        → (...params) => data * 2
   *   - arrow fn:    "data => data * 2" → używa bezpośrednio
   */
  private buildCallback(
    paramNames: string[],
    code: string,
  ): (...args: unknown[]) => unknown {
    if (!code.trim()) return (v: unknown) => v;

    try {
      // jeśli kod zawiera "=>" zakładamy że to gotowa arrow fn
      if (code.includes('=>')) {
        return new Function(
          ...Object.keys(USER_CODE_CONTEXT),
          `return (${code})`,
        )(...Object.values(USER_CODE_CONTEXT));
      }

      // inaczej traktujemy jako wyrażenie i owijamy w callback
      return new Function(
        ...Object.keys(USER_CODE_CONTEXT),
        ...paramNames,
        `return ${code}`,
      ).bind(null, ...Object.values(USER_CODE_CONTEXT));
    } catch (err) {
      console.warn('[Interpreter] Błąd parsowania kodu:', code, err);
      return (v: unknown) => v;
    }
  }

  /**
   * Parsuje label marble do właściwego typu.
   * '42' → 42, 'true' → true, reszta → string
   */
  private parseValue(label: string): unknown {
    if (label === 'true') return true;
    if (label === 'false') return false;
    const num = Number(label);
    if (!isNaN(num) && label.trim() !== '') return num;
    return label;
  }

  estimateResoult(
    testedResoult: StreamEvent[],
    correctResoult: StreamEvent[],
    weights: ChallengeWeights = {
      values: 40,
      timing: 25,
      sequence: 20,
      count: 10,
      completion: 5,
    },
  ): ChallengeResoults {
    const tested = [...testedResoult].sort(
      (a, b) => a.timeInterval - b.timeInterval,
    );

    const correct = [...correctResoult].sort(
      (a, b) => a.timeInterval - b.timeInterval,
    );

    if (!correct.length)
      return {
        stars: 0,
        score: 0,
        feedback: [],
      };

    /**
     * Kryteria:
     * Tablice takie same:
     * Kolejność taka sama:
     * Wartości poprawne
     * Odchylenie czasowe w normie (później wymagany identyczny czas):
     * Typy zgodne
     */

    const feedback: ChallengeResoults = {
      stars: 0,
      score: 0,
      feedback: [],
    };

    // Count score

    const countDiff = Math.abs(tested.length - correct.length);
    const countScore = Math.max(0, 1 - countDiff / correct.length);

    feedback.score += countScore * weights.count;

    if (countScore === 1) {
      feedback.feedback.push({
        msg: 'Correct number of emissions',
        type: 'success',
      });
    } else if (countScore > 0.7) {
      feedback.feedback.push({
        msg: 'Emission count slightly off',
        type: 'warn',
      });
    } else {
      feedback.feedback.push({
        msg: 'Wrong number of emissions',
        type: 'error',
      });
    }

    // Sequence score

    let typeMatches = 0;

    for (let i = 0; i < Math.min(tested.length, correct.length); i++) {
      if (tested[i].type === correct[i].type) {
        typeMatches++;
      }
    }

    const sequenceRatio = typeMatches / correct.length;

    feedback.score += sequenceRatio * weights.sequence;

    if (sequenceRatio === 1) {
      feedback.feedback.push({ msg: 'Sequence correct', type: 'success' });
    } else if (sequenceRatio > 0.7) {
      feedback.feedback.push({ msg: 'Sequence mostly correct', type: 'warn' });
    } else {
      feedback.feedback.push({ msg: 'Event order incorrect', type: 'error' });
    }

    // Value score

    let valueMatches = 0;

    for (let i = 0; i < Math.min(tested.length, correct.length); i++) {
      if (tested[i].label === correct[i].label) {
        valueMatches++;
      }
    }

    const valueRatio = valueMatches / correct.length;

    feedback.score += valueRatio * weights.values;

    if (valueRatio === 1) {
      feedback.feedback.push({ msg: 'Values correct', type: 'success' });
    } else if (valueRatio > 0.7) {
      feedback.feedback.push({
        msg: 'Some emitted values incorrect',
        type: 'warn',
      });
    } else {
      feedback.feedback.push({ msg: 'Values mostly incorrect', type: 'error' });
    }

    // Timing score

    const tolerance = 100;

    let timingTotal = 0;

    for (let i = 0; i < Math.min(tested.length, correct.length); i++) {
      const diff = Math.abs(tested[i].timeInterval - correct[i].timeInterval);

      // płynny spadek jakości
      const eventTimingScore = Math.max(0, 1 - diff / tolerance);

      timingTotal += eventTimingScore;
    }

    const timingRatio = timingTotal / correct.length;
    feedback.score += timingRatio * weights.timing;

    if (timingRatio === 1) {
      feedback.feedback.push({ msg: 'Timing perfect', type: 'success' });
    } else if (timingRatio > 0.7) {
      feedback.feedback.push({ msg: 'Timing slightly off', type: 'warn' });
    } else {
      feedback.feedback.push({ msg: 'Timing incorrect', type: 'error' });
    }

    // Termination bonus

    let completionRatio = 0;

    const testedLast = tested[tested.length - 1];

    const correctLast = correct[correct.length - 1];

    if (testedLast?.type === correctLast?.type) {
      completionRatio = 1;
      feedback.feedback.push({
        msg: 'Stream termination correct',
        type: 'success',
      });
    } else {
      feedback.feedback.push({
        msg: 'Completion/error mismatch',
        type: 'error',
      });
    }

    feedback.score += completionRatio * weights.completion;

    feedback.score =
      feedback.score /
      (weights.completion +
        weights.count +
        weights.sequence +
        weights.timing +
        weights.values);

    //convert to stars 0-5

    feedback.stars = 3.5;
    //Math.round(feedback.score);

    return feedback;
  }
}
