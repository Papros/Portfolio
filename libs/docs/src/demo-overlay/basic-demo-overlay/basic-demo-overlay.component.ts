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
  public readonly TOUR_ID          = 'basic-tour';
  public readonly TooltipPlacement = TooltipPlacement;
  public readonly SpotlightVariant = SpotlightVariant;
  public readonly PulseVariant     = PulseVariant;
 
  private readonly tourService = inject(PiprTourService);
 
  start():   void { this.tourService.startTour(this.TOUR_ID); }
  restart(): void { this.tourService.restartTour(this.TOUR_ID); }
}