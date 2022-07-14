import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, Input, OnInit, Output } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ILoaderService, LoaderToken, LOADER_SERVICE } from '@app/shared/loader';
import { ITileConfig, PredefinedComponent, TileBehavior, TitleType } from '@app/shared/tile-menu';
import { Animations } from './tile-menu-item.animations';

@Component({
  selector: 'app-tile-menu-item',
  templateUrl: './tile-menu-item.component.html',
  styleUrls: ['./tile-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ Animations.cardFlip],
})
export class TileMenuItemComponent implements OnInit {

  @Input()
  public options!: ITileConfig;

  public postAnimation = false;
  public isAnimated = false;
  public isCustom = false;

  public componentType = PredefinedComponent;
  public titleType = TitleType;

  @HostBinding('style')
  public hostStyle: SafeStyle;

  public baseStyle: SafeStyle;

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
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
      component: undefined,
    };

    this.baseStyle = {};
    this.hostStyle = {};
    this.isAnimated = false;
  }

  public ngOnInit(): void {
    this.baseStyle = this.getStyles();
    this.hostStyle = this.getHostStyles();
    this.isAnimated = this.options.behavior !== TileBehavior.None && this.options.behavior !== TileBehavior.Link;
    this.isCustom = !!this.options.component;
  }

  private updateStyles(additionalStyles?: SafeStyle): void {
    this.baseStyle = this.getStyles();
  }

  public getHostStyles(additionalStyles?: SafeStyle): SafeStyle {
    return this.options ?
    {
      'grid-column-start': this.options.column,
      'grid-column-end': `span ${this.options.width}`,
      'grid-row-start': this.options.row,
      'grid-row-end': (this.options.row + this.options.height),
    } : 
    {};
  }

  public getStyles(): SafeStyle {
    return {
      'cursor': this.options.isActive ? 'pointer' : 'default',
      'background-image': this.options.imageURL ? `url(${`assets/images/${this.options.imageURL}`})` : '',
      'background-color': this.options.background === '' ? 'rgb(88,68,86)' : this.options.background,
      'visibility': (this.options.isVisible ? 'visible' : 'hidden'),
    }
  }
 
  public handleClick(): void {
    switch(this.options.behavior) {
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
      case TileBehavior.Grow:
        this.postAnimation = !this.postAnimation;
        break;
      case TileBehavior.TurnOver:
        this.postAnimation = !this.postAnimation;
        break;
      case TileBehavior.Fall:
        this.postAnimation = !this.postAnimation;
        break;
      case TileBehavior.None:
      default:
        break;
    }
  }

}