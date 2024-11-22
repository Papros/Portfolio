import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent, MaintenancePageComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorPageComponent, MaintenancePageComponent],
  exports: [ErrorPageComponent, MaintenancePageComponent],
})
export class LandingPagesPackModule {}
