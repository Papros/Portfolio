import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITileConfig } from '../../interfaces';

@Component({
  selector: 'app-tile-menu',
  templateUrl: './tile-menu.component.html',
  styleUrls: ['./tile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileMenuComponent {
  @Input()
  public tilesOptions!: ITileConfig[];
}