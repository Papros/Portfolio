export type TourEvent =
  | { type: 'tourStarted'; tourId: string }
  | { type: 'stepChanged'; stepId: string; index: number }
  | { type: 'tourSkipped'; tourId: string }
  | { type: 'tourCompleted'; tourId: string }
  | { type: 'hintShown'; hintId: string }
  | { type: 'hintDismissed'; hintId: string };
