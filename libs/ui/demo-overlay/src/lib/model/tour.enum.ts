export enum TourItemType {
  TOUR = 'tour', // sequential, exclusive, with progress bar
  HINT = 'hint', // lazy, independent
}

export enum TourTrigger {
  MANUAL = 'manual',
  ON_VIEWPORT_ENTRY = 'onViewportEntry',
  ON_ROUTE_ACTIVATION = 'onRouteActivation',
  ON_HOVER = 'onHover',
  ON_DELAY = 'onDelay', // after N ms on page
  ON_IDLE = 'onIdle', // user inactive N ms
}

export enum TourTriggerAction {
  START = 'start', // show immediately on trigger
  START_AFTER_INVITE = 'startAfterInvite', // show invite tooltip first
}

export enum HintDismissBehavior {
  AUTO = 'auto', // auto-close after autoCloseMs
  ON_CLICK_OUTSIDE = 'onClickOutside',
  ON_DISMISS_BUTTON = 'onDismissButton',
  BOTH = 'both', // click outside OR button
}

export enum TooltipPlacement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  AUTO = 'auto', // flip to best fit
}

export enum PulseVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
  NONE = 'none',
}

export enum SpotlightVariant {
  NONE = 'none',
  SUBTLE = 'subtle', // soft dim + border glow
  FULL = 'full', // dark overlay, element cut out
}

export enum TourStatus {
  IDLE = 'idle',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
}

export enum HintStatus {
  PENDING = 'pending', // waiting for trigger
  VISIBLE = 'visible',
  DISMISSED = 'dismissed',
  SEEN = 'seen', // stored in storage, won't show again
}
