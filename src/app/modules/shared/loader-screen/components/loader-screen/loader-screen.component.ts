import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, Output } from '@angular/core';
import { LoaderScreenType } from '../..';

@Component({
  selector: 'loader-screen',
  templateUrl: './loader-screen.component.html',
  styleUrls: ['./loader-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderScreenComponent {
  public LoaderType = LoaderScreenType;

  @Input() 
  loaderType: LoaderScreenType = LoaderScreenType.RotatingCircle;
  
  constructor() {
    console.log("Loading screen constructor");
  }
}