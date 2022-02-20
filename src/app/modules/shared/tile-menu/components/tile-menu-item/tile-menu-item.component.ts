import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, Input, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TileBehavior } from '../..';
import { LoaderToken } from '../../../loader/enums';
import { ILoaderService } from '../../../loader/interfaces';
import { LOADER_SERVICE } from '../../../loader/loader.module.types';
import { ITileConfig } from '../../interfaces';

@Component({
  selector: 'tile-menu-item',
  templateUrl: './tile-menu-item.component.html',
  styleUrls: ['./tile-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileMenuItemComponent implements OnInit {

  @HostBinding('style') baseStyle: SafeStyle;

  @HostListener('click') onClick(){
    this.handleClick();
  }
  
  @Input()
  public options!: ITileConfig;

  constructor(
    private readonly router: Router,
    @Inject(LOADER_SERVICE) private readonly loaderService: ILoaderService,
  ){
    this.options = {
      targetURL: '',
      imageURL: '',
      iconURL: '',
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

  public ngOnInit(): void {
    this.updateStyles();
  }

  private updateStyles(additionalStyles?: SafeStyle): void {
    this.baseStyle = this.getStyles(additionalStyles);
  }

  private getStyles(additionalStyles?: SafeStyle): SafeStyle {
    return ( this.options ?
    {
      'cursor': this.options.isActive ? 'pointer' : 'default',
      'background-image': this.options.imageURL ? `url(${`assets/images/${this.options.imageURL}`})` : '',
      'background-color': this.options.background === '' ? 'rgb(88,68,86)' : this.options.background,
      'visibility': (this.options.isVisible ? 'visible' : 'hidden'),
      'grid-column-start': this.options.column,
      'grid-column-end': `span ${this.options.width}`,
      'grid-row-start': this.options.row,
      'grid-row-end': (this.options.row + this.options.height),
    } : 
    {});
  }
 
  private handleClick(): void {
    switch(this.options.behavior) {
      case TileBehavior.Grow: 
        break;
      case TileBehavior.Hide:
        this.options.isVisible = false;
        this.updateStyles();
        break;
      case TileBehavior.Link:
        if (new RegExp('^(http)?').test(this.options.targetURL)) {
          window.location.href = this.options.targetURL
        } else {
          this.router.navigate([this.options.targetURL])
          .then( () => this.loaderService.show(LoaderToken.RootLoader, 'router'))
          .finally(
            () => this.loaderService.hide(LoaderToken.RootLoader, 'router')
          );
        }
        break;
      case TileBehavior.TurnOver:
        break;
      case TileBehavior.None:
      default:
        break;
    }
  }

}
