import {
  Component,
  DestroyRef,
  HostBinding,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CurriculumVitaeInterface,
  CVSkill,
  LanguageLevel,
} from './curriculum-vitae.interface';
import { MatIconModule } from '@angular/material/icon';
import { cvDefault, cvDefault_pl } from './default.data';
import {
  CamelCaseFormatPipe,
  PhoneNumberFormatPipe,
} from '@portfolio/shared-pack/pipes';
import {
  provideTranslocoScope,
  TranslocoModule,
  TranslocoService,
} from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  LanguageSelectorComponent,
  ThemeSelectorComponent,
} from '@portfolio/customization';
import { FooterComponent } from '@portfolio/shared-pack/components';

@Component({
  selector: 'lib-curriculum-vitae',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    PhoneNumberFormatPipe,
    CamelCaseFormatPipe,
    TranslocoModule,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    FooterComponent,
  ],
  providers: [provideTranslocoScope({ scope: 'cv', alias: 'cv' })],
  templateUrl: './curriculum-vitae.component.html',
  styleUrl: './curriculum-vitae.component.scss',
})
export class CurriculumVitaeComponent implements OnInit {
  @Input()
  cvDate: CurriculumVitaeInterface | null = cvDefault;

  isDarkMode = false;

  readonly hoveredSkill = signal<string | null>(null);
  readonly printMode = signal<'color' | 'bw'>('color');
  readonly currentYear = new Date().getFullYear();

  @HostBinding('class.dark-mode')
  get darkModeClass(): boolean {
    return this.isDarkMode;
  }

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

  constructor(
    private translocoService: TranslocoService,
    private destroyRef: DestroyRef,
  ) {
    this.translocoService.langChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
        this.cvDate = (
          lang === 'pl' ? cvDefault_pl : cvDefault
        ) as CurriculumVitaeInterface;
      });
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('cv-dark-mode');

    if (stored !== null) {
      this.isDarkMode = stored === 'true';
    } else {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('cv-dark-mode', String(this.isDarkMode));
  }

  togglePrintMode(): void {
    this.printMode.set(this.printMode() === 'color' ? 'bw' : 'color');
  }

  printCV(): void {
    const isBw = this.printMode() === 'bw';
    if (isBw) {
      document.body.classList.add('cv-print-bw');
    }
    window.print();

    if (isBw) {
      document.body.classList.remove('cv-print-bw');
    }
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default_avatar.png';
    //TO-DO AdBlock popup here
  }

  getLangWidth(level: LanguageLevel | string): string {
    const map: Record<string, string> = {
      [LanguageLevel.A1]: '14%',
      [LanguageLevel.A2]: '28%',
      [LanguageLevel.B1]: '50%',
      [LanguageLevel.B2]: '68%',
      [LanguageLevel.C1]: '82%',
      [LanguageLevel.C2]: '94%',
      [LanguageLevel.NATIVE]: '100%',
    };
    return map[level] ?? '50%';
  }

  isSkillActive(skillName: string): boolean {
    const hovered = this.hoveredSkill();
    return (
      hovered !== null && hovered.toLowerCase() === skillName.toLowerCase()
    );
  }
}
