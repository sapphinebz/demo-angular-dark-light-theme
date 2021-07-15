import { ThrowStmt } from '@angular/compiler';
import { ApplicationRef, Injectable } from '@angular/core';
import { filter, map, shareReplay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private LIGHT_THEME = 'light-theme' as const;
  private DARK_THEME = 'dark-theme' as const;
  /**
   * default Theme
   */
  selectedTheme = this.LIGHT_THEME;
  /**
   * avaliable Theme
   */
  availableTheme = [this.LIGHT_THEME, this.DARK_THEME];

  onLoadedAppRoot$ = this.AppRef.isStable.pipe(
    filter(Boolean),
    map((_) => this.AppRef.components[0]),
    take(1)
  );
  /**
   * Application Component HTMLElement (Observable)
   */
  appEl$ = this.onLoadedAppRoot$.pipe(
    map((componentRef) => {
      const appEl: HTMLElement = componentRef.location.nativeElement;
      return appEl;
    }),
    shareReplay(1)
  );
  /**
   * Application Component HTMLElement
   */
  appEl!: HTMLElement;

  constructor(private AppRef: ApplicationRef) {
    this.appEl$.subscribe((appEl) => {
      this.appEl = appEl;
      appEl.classList.add(this.selectedTheme);
    });
  }

  switchTheme() {
    this.availableTheme.forEach((theme) => this.toggleClass(theme));
  }

  addClass(name: string) {
    this.appEl.classList.add(name);
  }

  toggleClass(name: string) {
    this.appEl.classList.toggle(name);
  }

  lightTheme() {
    this.addClass(this.LIGHT_THEME);
  }

  darkTheme() {
    this.addClass(this.DARK_THEME);
  }
}
