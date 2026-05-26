export type TourEvent =
  | { type: 'tourStarted'; tourId: string }
  | { type: 'stepChanged'; tourId: string; stepId: string; index: number }
  | { type: 'tourSkipped'; tourId: string; stepId: string }
  | { type: 'tourCompleted'; tourId: string }
  | { type: 'tourPaused'; tourId: string }
  | { type: 'tourResumed'; tourId: string }
  | { type: 'hintShown'; hintId: string }
  | { type: 'hintDismissed'; hintId: string }
  | { type: 'inviteShown'; hintId: string }
  | { type: 'inviteAccepted'; hintId: string };
