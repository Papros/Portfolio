import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLabelOptions, GridMenuComponent } from '@portfolio/shared-pack';

@Component({
  selector: 'lib-main-menu-page',
  imports: [CommonModule, GridMenuComponent],
  templateUrl: './main-menu-page.component.html',
  styleUrl: './main-menu-page.component.scss',
})
export class MainMenuPageComponent {
  menuConfig = {
    gridWidth: 10,
    gridHeight: 10,
    items: [
      {
        id: 'about',
        options: { enabled: true, visible: true, background: '#3b82f6' },
        position: { colStart: 1, colSpan: 7, rowStart: 1, rowSpan: 1 },
        label: {
          value: 'About Me',
          shadow: true,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'componentGallery',
        options: { enabled: true, visible: true, background: '#10b981' },
        position: { colStart: 1, colSpan: 3, rowStart: 2, rowSpan: 4 },
        label: {
          value: 'Component Gallery',
          shadow: true,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },

      {
        id: 'gameGallery',
        options: { enabled: true, visible: true, background: '#f59e0b' },
        position: { colStart: 4, colSpan: 4, rowStart: 2, rowSpan: 2 },
        label: {
          value: 'Game Gallery',
          shadow: true,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'git',
        options: { enabled: true, visible: true, background: '#111827' },
        position: { colStart: 8, colSpan: 3, rowStart: 1, rowSpan: 2 },
        label: {
          value: 'GitHub',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'widgetWeather',
        options: { enabled: true, visible: true, background: '#0ea5e9' },
        position: { colStart: 8, colSpan: 3, rowStart: 4, rowSpan: 2 },
        label: {
          value: 'Weather Widget',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'cv',
        options: { enabled: true, visible: true, background: '#6d28d9' },
        position: { colStart: 8, colSpan: 3, rowStart: 3, rowSpan: 1 },
        label: {
          value: 'CV',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'widgetChart',
        options: { enabled: true, visible: true, background: '#ef4444' },
        position: { colStart: 5, colSpan: 3, rowStart: 4, rowSpan: 2 },
        label: {
          value: 'Chart Widget',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'linkedin',
        options: { enabled: true, visible: true, background: '#2563eb' },
        position: { colStart: 3, colSpan: 3, rowStart: 6, rowSpan: 2 },
        label: {
          value: 'LinkedIn',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'widgetTrivia',
        options: { enabled: true, visible: true, background: '#84cc16' },
        position: { colStart: 6, colSpan: 6, rowStart: 6, rowSpan: 3 },
        label: {
          value: 'Trivia Widget',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'achievements',
        options: { enabled: true, visible: true, background: '#f97316' },
        position: { colStart: 1, colSpan: 2, rowStart: 6, rowSpan: 5 },
        label: {
          value: 'Achievements 🏆',
          shadow: true,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'contact',
        options: { enabled: true, visible: true, background: '#14b8a6' },
        position: { colStart: 3, colSpan: 3, rowStart: 8, rowSpan: 3 },
        label: {
          value: 'Contact Form',
          shadow: true,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'easterEgg',
        options: { enabled: true, visible: true, background: '#f472b6' },
        position: { colStart: 6, colSpan: 3, rowStart: 9, rowSpan: 2 },
        label: {
          value: 'Easter Egg 🐞',
          shadow: true,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
      {
        id: 'gapBottom',
        options: { enabled: false, visible: false, background: '#000' },
        position: { colStart: 9, colSpan: 2, rowStart: 9, rowSpan: 2 },
        label: {
          value: '',
          shadow: false,
          positionHorizontal: 1,
          positionVertical: 1,
        },
      },
    ],
  };
}
