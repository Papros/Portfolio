import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { ITileConfig } from '../../interfaces';

@Component({
  selector: 'tile-menu-item',
  templateUrl: './tile-menu-item.component.html',
  styleUrls: ['./tile-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileMenuItemComponent implements OnInit {

  @HostBinding('style') baseStyle: SafeStyle;
  
  @Input()
  public options!: ITileConfig;

  constructor(){
    this.options = {
      targetURL: '',
      imageURL: '',
      background: '',
      text: '',
      row: 0,
      column: 0,
      width: 0,
      height: 0,
      isVisible: false,
    };

    this.baseStyle = this.getStyles();
  }

  ngOnInit(): void {
    this.baseStyle = this.getStyles();
  }

  public getStyles() {
    return ( this.options ?
    {
      'cursor': this.options.isActive ? 'pointer' : 'default',
      'background-image': this.options.imageURL ? `url(${`assets/images/${this.options.imageURL}`})` : '',
      'background-color': this.options.background === '' ? 'rgb(88,68,86)' : this.options.background,
      'visibility': (this.options.isVisible ? 'visible' : 'hidden'),
      'grid-column-start': this.options.column,
      'grid-column-end': `span ${this.options.width}`,
      'grid-row-start': this.options.row,
      'grid-row-end': (this.options.row + this.options.height)
    } : 
    {});
  }
}
