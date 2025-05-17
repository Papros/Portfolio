import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CurriculumVitaeInterface,
  CVSkill,
} from './curriculum-vitae.interface';
import { MatIconModule } from '@angular/material/icon';
import { cvDefault } from './default.data';
import {
  CamelCaseFormatPipe,
  PhoneNumberFormatPipe,
  UpperCaseFormatPipe,
} from '@portfolio/shared-pack';

@Component({
  selector: 'lib-curriculum-vitae',
  imports: [
    CommonModule,
    MatIconModule,
    PhoneNumberFormatPipe,
    UpperCaseFormatPipe,
    CamelCaseFormatPipe,
  ],
  templateUrl: './curriculum-vitae.component.html',
  styleUrl: './curriculum-vitae.component.scss',
})
export class CurriculumVitaeComponent implements OnInit {
  @Input()
  cvDate: CurriculumVitaeInterface | null = cvDefault;

  get sortedSkills(): CVSkill[] {
    return (
      this.cvDate?.skills.sort((skillA, skillB) => {
        return (skillB.rating || 0) - (skillA.rating || 0);
      }) || []
    );
  }

  get subtitle(): string {
    return this.cvDate?.basicInfo.position.toUpperCase() || '';
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default_avatar.png';
    //TO-DO AdBlock popup here
  }
}
