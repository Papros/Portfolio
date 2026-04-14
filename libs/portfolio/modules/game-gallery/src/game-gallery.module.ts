import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GameGalleryComponent,
  GameGalleryPageComponent,
} from './lib/components';
import { DateTimePickerComponent } from '@papros-it/date-time-picker';

const routes: Routes = [
  {
    path: '',
    component: GameGalleryPageComponent,
    children: [{ path: '', component: GameGalleryComponent }],
  },
];

@NgModule({
  declarations: [GameGalleryPageComponent, GameGalleryComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DateTimePickerComponent],
  providers: [],
})
export class GameGalleryModule {}
