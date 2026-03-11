import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GameGalleryComponent,
  GameGalleryPageComponent,
} from './lib/components';

const routes: Routes = [
  {
    path: '',
    component: GameGalleryPageComponent,
    children: [{ path: '', component: GameGalleryComponent }],
  },
];

@NgModule({
  declarations: [GameGalleryPageComponent, GameGalleryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class GameGalleryModule {}
