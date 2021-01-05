import { Injectable, EventEmitter } from "@angular/core";
import { Theme, light, dark } from "./theme";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  constructor(){}

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }
  
public  activetheme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(light);
  setActiveTheme(theme: Theme): void {
    this.active = theme;
    this.activetheme.next(this.active);
    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
