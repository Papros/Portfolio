import { Component, inject } from '@angular/core';
import { PiprTourStepDirective, TooltipPlacement } from '@papros-it/demo-overlay';
import { PiprTourService, TourTrigger, SpotlightVariant, PulseVariant } from '@papros-it/demo-overlay';

@Component({
  selector: 'pipr-tour-basic-example',
  standalone: true,
  imports: [PiprTourStepDirective],
  templateUrl: './basic-demo-overlay.component.html',
  styleUrls: ['./basic-demo-overlay.component.scss'],
})
export class TourBasicExampleComponent {
  private readonly tourService = inject(PiprTourService);
  protected readonly TooltipPlacement = TooltipPlacement;
  
  start():   void { this.tourService.startTour('basic-tour'); }
  restart(): void { this.tourService.restartTour('basic-tour'); }
}