import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITileConfig } from '../../interfaces';

@Component({
  selector: 'tile-menu-item',
  templateUrl: './tile-menu-item.component.html',
  styleUrls: ['./tile-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileMenuItemComponent implements OnInit {

  @Input()
  public options!: ITileConfig;

  ngOnInit(): void {
  }
}
