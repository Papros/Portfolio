import { ComponentDoc } from './component-details.interface';

import { HintInviteExampleComponent, HintTriggersExampleComponent, TourAnchorSelectorExampleComponent, TourBasicExampleComponent, TourCustomTemplateExampleComponent, TourEventsExampleComponent, TourRoutingExampleComponent, TourSpotlightExampleComponent } from '@docs/demo-overlay';
// import { TourRoutingExampleComponent }         from '@docs/pipr-tour/tour-routing-example.component';
// import { TourSpotlightExampleComponent }       from '@docs/pipr-tour/tour-spotlight-example.component';
// import { TourCustomTemplateExampleComponent }  from '@docs/pipr-tour/tour-custom-template-example.component';
// import { HintTriggersExampleComponent }        from '@docs/pipr-tour/hint-triggers-example.component';
// import { HintInviteExampleComponent }          from '@docs/pipr-tour/hint-invite-example.component';
// import { TourEventsExampleComponent }          from '@docs/pipr-tour/tour-events-example.component';
// import { TourAnchorSelectorExampleComponent }  from '@docs/pipr-tour/tour-anchor-selector-example.component';

export const demoOverlayDoc: ComponentDoc = {
  id: 'demo-overlay',
  meta: {
    id: 'demo-overlay',
    title: 'Tour & Hint',
    description:
      'Two-mode onboarding system. Tours are sequential, exclusive step queues ' +
      'with progress tracking and optional cross-route navigation. Hints are lazy, ' +
      'independent contextual tooltips triggered by viewport entry, hover, delay, ' +
      'idle time, or programmatically.',
    thumbnail: 'assets/images/component-demo/demo-overlay-icon.png',
  },
  overview: {
    sections: [
      {
        type: 'markdown',
        id: 'overview',
        title: 'Overview',
        content: `
**pipr-tour** is a two-mode onboarding system built for Angular 17+.

**Tour** — a sequential, exclusive queue of steps controlled by \`PiprTourService\`. Only one tour runs at a time. Each step is registered via \`[piprTourStep]\` and can navigate to a different route before appearing. Keyboard navigation (← → Escape) is supported out of the box.

**Hint** — lazy, independent contextual tooltips. Each hint has its own trigger strategy (\`ON_VIEWPORT_ENTRY\`, \`ON_HOVER\`, \`ON_DELAY\`, \`ON_IDLE\`, \`MANUAL\`) and is automatically suppressed while a tour is running.
 
Both modes share the same overlay infrastructure: spotlight backdrop, animated pulse ring, and a composable tooltip that accepts plain text, a \`TemplateRef\`, or a dynamic component as content.
        `.trim(),
      },
      {
        type: 'markdown',
        id: 'setup',
        title: 'Setup',
        content: `
Register the system once in \`app.config.ts\`:
 
\`\`\`ts
import { providePiprTour, SpotlightVariant, PulseVariant } from '@pipr/tour';
 
export const appConfig: ApplicationConfig = {
  providers: [
    providePiprTour({
      userId: 'browser',            // or your auth user ID
      onUnexpectedNavigation: 'skip', // 'skip' | 'pause' | 'ignore'
      defaults: {
        spotlight:     SpotlightVariant.FULL,
        pulse:         PulseVariant.PRIMARY,
        allowKeyboard: true,
        showProgress:  true,
        skipLabel:     'Skip tour',
        nextLabel:     'Next',
        prevLabel:     'Back',
        finishLabel:   'Finish',
      },
    }),
  ],
};
\`\`\`
 
\`providePiprTour()\` mounts \`PiprTourOverlayComponent\` directly to \`document.body\` via \`APP_INITIALIZER\`, so it is never affected by ancestor \`overflow: hidden\` or \`z-index\` stacking contexts.
        `.trim(),
      },
      {
        type: 'example',
        id: 'basic-usage',
        title: 'Basic tour',
        description:
          'Three steps registered via `[piprTourStep]` directive. ' +
          'Start and restart via `PiprTourService`.',
        example: {
          id: 'tour-basic',
          title: 'Basic tour',
          description:
            'Directive-driven registration. Steps are auto-sorted by `order`. ' +
            'Keyboard navigation enabled (← → Escape).',
          //component: TourBasicExampleComponent,
          component: TourBasicExampleComponent ,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'spotlight-variants',
        title: 'Spotlight & pulse variants',
        description:
          'Each step can declare its own `SpotlightVariant` and `PulseVariant`, ' +
          'overriding the tour-level and global defaults.',
        example: {
          id: 'tour-spotlight',
          title: 'Spotlight variants',
          description:
            '`NONE` / `SUBTLE` / `FULL` spotlight combined with `PRIMARY`, `SECONDARY`, `ACCENT` pulse rings.',
          component: TourBasicExampleComponent, //TourSpotlightExampleComponent,
          source: { ts: true, html: true },
        },
      },
      {
        type: 'example',
        id: 'custom-templates',
        title: 'Custom tooltip templates',
        description:
          'Pass a `TemplateRef` via the `[template]` input to render arbitrary Angular content ' +
          'inside the tooltip — images, links, checklists, embedded video.',
        example: {
          id: 'tour-custom-template',
          title: 'Custom templates',
          description:
            'Three steps each with a distinct `ng-template` — rich HTML, a video placeholder, and an interactive checklist.',
          component: TourBasicExampleComponent, //component: TourCustomTemplateExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'cross-route',
        title: 'Cross-route navigation',
        description:
          'Set `[route]` on any step to trigger `router.navigateByUrl()` before the tooltip appears. ' +
          'Override with your own `IPiprTourNavigation` implementation.',
        example: {
          id: 'tour-routing',
          title: 'Cross-route tour',
          description:
            'Each step declares a `route`. The service navigates automatically before showing the tooltip.',
          component: TourBasicExampleComponent, //component: TourRoutingExampleComponent,
          source: { ts: true, html: true },
        },
      },
      {
        type: 'example',
        id: 'anchor-selector',
        title: 'Anchor selector',
        description:
          '`anchorSelector` lets you place the directive on a container while ' +
          'targeting an inner child element for the pulse ring and tooltip position.',
        example: {
          id: 'tour-anchor-selector',
          title: 'Anchor selector',
          description:
            'Directive on `<nav>`, `<div>`, and a toolbar — each with `anchorSelector` pointing to a specific child button or toggle.',
          component: TourBasicExampleComponent, //component: TourAnchorSelectorExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'hint-triggers',
        title: 'Hint triggers',
        description:
          'Hints activate independently via `TourTrigger` — `ON_VIEWPORT_ENTRY`, `ON_HOVER`, ' +
          '`ON_DELAY`, `ON_IDLE`, or `MANUAL`. They are automatically suppressed when a tour is running.',
        example: {
          id: 'hint-triggers',
          title: 'All trigger strategies',
          description:
            'Five hint cards — one per `TourTrigger` value — each with different dismiss behavior and placement.',
          component: TourBasicExampleComponent, //component: HintTriggersExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'hint-invite',
        title: 'Hint invite flow',
        description:
          '`TourTriggerAction.START_AFTER_INVITE` shows a small invite tooltip first. ' +
          'The user opts in before seeing the full hint. Combines well with `anchorSelector`.',
        example: {
          id: 'hint-invite',
          title: 'Invite flow',
          description:
            'Two hints with `START_AFTER_INVITE` — one on viewport entry, one on hover. ' +
            '`anchorSelector` targets the inner action button / icon.',
          component: TourBasicExampleComponent, //component: HintInviteExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'example',
        id: 'events-stream',
        title: 'Events stream',
        description:
          '`PiprTourService.events$` emits a typed `TourEvent` union for every lifecycle transition. ' +
          'Subscribe anywhere to react to tour progress.',
        example: {
          id: 'tour-events',
          title: 'events$ live log',
          description:
            'Events are logged in real time as the tour progresses. ' +
            'Also demonstrates `MemoryTourStorage` — a custom storage implementation with no persistence.',
          component: TourBasicExampleComponent, //component: TourEventsExampleComponent,
          source: { ts: true, html: true, scss: true },
        },
      },
      {
        type: 'markdown',
        id: 'persistence',
        title: 'Custom persistence',
        content: `
By default, seen state is stored in \`localStorage\` keyed by \`userId\`. To override, implement \`IPiprTourStorage\` and provide it:

\`\`\`ts
export class ApiTourStorage implements IPiprTourStorage {
  constructor(private http: HttpClient) {}

  markSeen(userId: string, id: string): void {
    this.http.post(\`/api/seen\`, { userId, id }).subscribe();
  }
  hasSeen(userId: string, id: string): boolean {
    // For sync usage, pre-fetch and cache on init.
    return this.cache.has(\`\${userId}:\${id}\`);
  }
  clearSeen(userId: string, id?: string): void { /* ... */ }
  getAllSeen(userId: string): string[] { return []; }
}

// In app.config.ts:
providePiprTour({
  userId: auth.userId,
  storage: new ApiTourStorage(http),
})
\`\`\`
        `.trim(),
      },
      {
        type: 'markdown',
        id: 'custom-navigation',
        title: 'Custom navigation',
        content: `
The default \`RouterTourNavigation\` calls \`router.navigateByUrl(route)\`. Override for custom logic:

\`\`\`ts
export class GuardedTourNavigation implements IPiprTourNavigation {
  private readonly router = inject(Router);
  private readonly auth   = inject(AuthService);

  async navigate(route: string): Promise<boolean> {
    if (!this.auth.canAccess(route)) {
      console.warn('[tour] Navigation blocked by guard.');
      return false;
    }
    return this.router.navigateByUrl(route);
  }
}

// In app.config.ts:
providePiprTour({
  userId: 'browser',
  navigation: new GuardedTourNavigation(),
})
\`\`\`
        `.trim(),
      },
    ],
  },

  // - API ----------------------

  api: {
    inputs: [
      // PiprTourStepDirective
      {
        name: 'piprTourStep',
        type: 'string',
        defaultValue: '—',
        description: '[TourStep] Unique step ID. Also acts as the directive selector alias.',
      },
      {
        name: 'tourId',
        type: 'string',
        defaultValue: '—',
        description: '[TourStep] ID of the parent tour this step belongs to.',
      },
      {
        name: 'order',
        type: 'number',
        defaultValue: '0',
        description: '[TourStep] Position of this step within the tour sequence.',
      },
      {
        name: 'title',
        type: 'string',
        defaultValue: '—',
        description: '[TourStep | Hint] Tooltip heading text.',
      },
      {
        name: 'content',
        type: 'string',
        defaultValue: 'undefined',
        description: '[TourStep | Hint] Plain text or HTML string. Overridden by `template` or `component`.',
      },
      {
        name: 'template',
        type: 'TemplateRef<unknown>',
        defaultValue: 'undefined',
        description: '[TourStep | Hint] Custom Angular template rendered inside the tooltip body. Takes priority over `content`.',
      },
      {
        name: 'component',
        type: 'Type<unknown>',
        defaultValue: 'undefined',
        description: '[TourStep | Hint] Dynamic component rendered inside the tooltip. Highest content priority.',
      },
      {
        name: 'placement',
        type: 'TooltipPlacement',
        defaultValue: 'TooltipPlacement.BOTTOM',
        description: '[TourStep | Hint] Preferred tooltip position. `AUTO` flips to best fit.',
      },
      {
        name: 'pulse',
        type: 'PulseVariant',
        defaultValue: 'PulseVariant.PRIMARY',
        description: '[TourStep | Hint] Colour of the animated pulse ring on the anchor element.',
      },
      {
        name: 'spotlight',
        type: 'SpotlightVariant',
        defaultValue: 'SpotlightVariant.FULL',
        description: '[TourStep | Hint] Backdrop intensity. `NONE` / `SUBTLE` / `FULL`.',
      },
      {
        name: 'route',
        type: 'string',
        defaultValue: 'undefined',
        description: '[TourStep] Route to navigate to before showing this step. Uses `IPiprTourNavigation`.',
      },
      {
        name: 'draggable',
        type: 'boolean',
        defaultValue: 'false',
        description: '[TourStep] Allow the user to drag the tooltip if it obscures the anchored element.',
      },
      {
        name: 'scrollIntoView',
        type: 'boolean',
        defaultValue: 'true',
        description: '[TourStep] Scroll the host element into view before showing the tooltip.',
      },
      {
        name: 'anchorSelector',
        type: 'string',
        defaultValue: 'undefined',
        description:
          '[TourStep | Hint] CSS selector resolved relative to the directive host. ' +
          'When set, the pulse ring and tooltip target the matching child element instead of the host.',
      },
      // PiprHintDirective-specific
      {
        name: 'piprHint',
        type: 'string',
        defaultValue: '—',
        description: '[Hint] Unique hint ID. Also acts as the directive selector alias.',
      },
      {
        name: 'trigger',
        type: 'TourTrigger',
        defaultValue: 'TourTrigger.ON_VIEWPORT_ENTRY',
        description: '[Hint] Activation strategy. See `TourTrigger` enum.',
      },
      {
        name: 'triggerAction',
        type: 'TourTriggerAction',
        defaultValue: 'TourTriggerAction.START',
        description: '[Hint] What to do when triggered — show immediately or show an invite first.',
      },
      {
        name: 'dismiss',
        type: 'HintDismissBehavior',
        defaultValue: 'HintDismissBehavior.BOTH',
        description: '[Hint] How the hint can be dismissed — auto-close, click outside, button, or both.',
      },
      {
        name: 'autoCloseMs',
        type: 'number',
        defaultValue: 'undefined',
        description: '[Hint] Auto-close delay in ms. Only used with `HintDismissBehavior.AUTO`.',
      },
      {
        name: 'delayMs',
        type: 'number',
        defaultValue: '3000',
        description: '[Hint] Delay in ms before triggering. Only used with `TourTrigger.ON_DELAY`.',
      },
      {
        name: 'idleMs',
        type: 'number',
        defaultValue: '5000',
        description: '[Hint] Idle duration in ms before triggering. Only used with `TourTrigger.ON_IDLE`.',
      },
      {
        name: 'persist',
        type: 'boolean',
        defaultValue: 'true',
        description: '[Hint] Whether to store the seen state in `IPiprTourStorage`. Set to `false` for always-show hints.',
      },
      {
        name: 'inviteText',
        type: 'string',
        defaultValue: 'undefined',
        description: '[Hint] Text shown in the invite tooltip. Required when `triggerAction` is `START_AFTER_INVITE`.',
      },
    ],
    outputs: [],
  },

  // - Examples index -------------------

  examples: [
    {
      id: 'tour-basic',
      title: 'Basic tour',
      description: 'Three-step directive-driven tour with keyboard navigation.',
      component: TourBasicExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'tour-spotlight',
      title: 'Spotlight variants',
      description: 'All SpotlightVariant + PulseVariant combinations side by side.',
      component: TourSpotlightExampleComponent,
      source: { ts: true, html: true },
    },
    {
      id: 'tour-custom-template',
      title: 'Custom templates',
      description: 'TemplateRef content — rich HTML, media placeholder, checklist.',
      component: TourCustomTemplateExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'tour-routing',
      title: 'Cross-route tour',
      description: 'Steps with [route] input triggering router navigation.',
      component: TourRoutingExampleComponent,
      source: { ts: true, html: true },
    },
    {
      id: 'tour-anchor-selector',
      title: 'Anchor selector',
      description: 'Directive on container, pulse and tooltip on a child element.',
      component: TourAnchorSelectorExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'hint-triggers',
      title: 'Hint trigger strategies',
      description: 'All five TourTrigger values demonstrated side by side.',
      component: HintTriggersExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'hint-invite',
      title: 'Hint invite flow',
      description: 'START_AFTER_INVITE with anchorSelector targeting inner elements.',
      component: HintInviteExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
    {
      id: 'tour-events',
      title: 'Events stream',
      description: 'Live events$ log + MemoryTourStorage custom implementation.',
      component: TourEventsExampleComponent,
      source: { ts: true, html: true, scss: true },
    },
  ],
};