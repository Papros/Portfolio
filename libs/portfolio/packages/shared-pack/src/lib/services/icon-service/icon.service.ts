import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons(): void {
    this.registerIcon('compass-needle', 'assets/icons/compass-needle-icon.svg');
    this.registerIcon('compass-glowing', 'assets/icons/compass-icon.svg');
  }

  private registerIcon(iconName: string, iconPath: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(iconPath)
    );
  }
}
