import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoadStyleService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'mfe-styles'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'mfe-styles';
      style.rel = 'stylesheet';
      style.href = `${environment.styles}${styleName}`;

      head.appendChild(style);
    }
  }

  unLoadStyle() {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'mfe-styles'
    ) as HTMLLinkElement;
    if (themeLink) {
      head.removeChild(themeLink);
    }
  }
}
