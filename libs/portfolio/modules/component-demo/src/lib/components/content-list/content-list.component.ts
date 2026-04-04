import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  signal,
} from '@angular/core';
import { DocArticleSection } from '@docs-model';

@Component({
  selector: 'lib-content-list',
  standalone: false,
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss',
})
export class ContentListComponent implements AfterViewInit, OnDestroy {
  @Input() sections?: { id: string; title: string }[] = [];
  activeSection = signal<string | null>(null);

  ngAfterViewInit() {
    const sectionIds = this.sections?.map((s) => 'section-' + s.id) ?? [];
    const scrollContainer = document.querySelector('mat-drawer-content')!;

    const onScroll = () => {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const offset = 48 + 16;

      let closest: string | null = null;
      let closestDistance = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const distance = Math.abs(
          el.getBoundingClientRect().top - containerTop - offset,
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = id;
        }
      });

      if (closest) this.activeSection.set(closest);
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    this._scrollCleanup = () =>
      scrollContainer.removeEventListener('scroll', onScroll);
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();

    const scrollContainer = document.querySelector('mat-drawer-content')!;
    const el = document.getElementById('section-' + sectionId);
    if (!el) return;

    const containerTop = scrollContainer.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    const offset = 48 + 16;

    scrollContainer.scrollBy({
      top: elTop - containerTop - offset,
      behavior: 'smooth',
    });
  }

  private _scrollCleanup?: () => void;

  ngOnDestroy() {
    this._scrollCleanup?.();
  }
}
