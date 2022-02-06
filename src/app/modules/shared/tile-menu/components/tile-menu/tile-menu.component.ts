import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITileConfig } from '../../interfaces';

@Component({
  selector: 'tile-menu',
  templateUrl: './tile-menu.component.html',
  styleUrls: ['./tile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileMenuComponent {
  @Input()
  public tilesOptions!: ITileConfig[];

  public getStyles(options: ITileConfig) {
    return ( options ?
    {
      'cursor': options.isActive ? 'pointer' : 'default',
      'background-image': options.imageURL ? `url(${`assets/images/${options.imageURL}`})` : '',
      'background-color': options.background === '' ? 'rgb(88,68,86)' : options.background,
      'visibility': (options.isVisible ? 'visible' : 'hidden'),
      'grid-column-start': options.column,
      'grid-column-end': `span ${options.width}`,
      'grid-row-start': options.row,
      'grid-row-end': (options.row + options.height)
    } : 
    {});
  }
}