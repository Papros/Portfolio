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

export interface ChallengeResoults {
  passed: boolean;
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
      let resolved = false;
      const safeResolve = (result: InterpreterResult) => {
        if (!resolved) {
          resolved = true;
          resolve(result);
        }
      };

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

        const timeoutId = setTimeout(() => {
          safeResolve({ stream: result, completeTime: null, time: Date.now() });
        }, maxTime + 500);

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
            safeResolve({
              stream: result,
              completeTime: null,
              error: String(err),
              time: Date.now(),
            });
          },
          complete: () => {
            completeTime = Math.min(Date.now() - startTime, maxTime);
            safeResolve({ stream: result, completeTime, time: Date.now() });
          },
        });
      } catch (err: unknown) {
        // synchroniczny catch (np. błąd parsowania kodu)
        safeResolve({
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
    const rxjsPipes: AnyOperator[] = operators.map((op) =>
      this.buildPipeableOperator(op),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (source$ as any).pipe(...rxjsPipes);
  }

  private buildPipeableOperator(op: PipeOperator): AnyOperator {
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
  private buildCallback(paramNames: string[], code: string): UserCallback {
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
  ): ChallengeResoults {
    const tested = [...testedResoult].sort(
      (a, b) => a.timeInterval - b.timeInterval,
    );

    const correct = [...correctResoult].sort(
      (a, b) => a.timeInterval - b.timeInterval,
    );

    const feedback: ChallengeResoults = {
      passed: false,
      feedback: [],
    };

    if (!correct.length) return feedback;

    /**
     * Kryteria:
     * Tablice takie same:
     * Kolejność taka sama:
     * Wartości poprawne
     * Typy zgodne
     */

    // Count score

    const countOk = tested.length === correct.length;
    feedback.feedback.push(
      countOk
        ? { msg: 'Correct number of emissions', type: 'success' }
        : {
            msg: `Wrong emission count: got ${tested.length}, expected ${correct.length}`,
            type: 'error',
          },
    );

    // Sequence score

    let sequenceOk = true;
    let valuesOk = true;

    for (let i = 0; i < Math.min(tested.length, correct.length); i++) {
      if (tested[i].type !== correct[i].type) sequenceOk = false;
      if (tested[i].label !== correct[i].label) valuesOk = false;
    }

    feedback.feedback.push(
      sequenceOk
        ? { msg: 'Event sequence correct', type: 'success' }
        : { msg: 'Event order or type mismatch', type: 'error' },
    );

    feedback.feedback.push(
      valuesOk
        ? { msg: 'Values correct', type: 'success' }
        : { msg: 'Emitted values incorrect', type: 'error' },
    );

    // Termination

    const testedLast = tested[tested.length - 1];
    const correctLast = correct[correct.length - 1];
    const terminationOk = testedLast?.type === correctLast?.type;

    feedback.feedback.push(
      terminationOk
        ? { msg: 'Stream termination correct', type: 'success' }
        : { msg: 'Completion/error mismatch', type: 'error' },
    );

    feedback.passed = countOk && sequenceOk && valuesOk && terminationOk;

    return feedback;
  }
}
