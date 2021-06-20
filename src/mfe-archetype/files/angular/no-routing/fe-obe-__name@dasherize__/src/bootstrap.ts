import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {
  ApplicationRef,
  enableProdMode,
  PlatformRef,
  isDevMode,
  NgZone,
} from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  try {
    enableProdMode();
    // console.warn('BUGFIX: calling isDevMode() in imports before enableProdMode() throws exception - https://github.com/angular/angular-cli/issues/8340#\n', exception);
  } catch (error) {}
}

let platformRef: PlatformRef;

function mount(el: HTMLElement) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((app) => {
      const appRef = app.injector.get(ApplicationRef);
      const ngZoneRef = app.injector.get(NgZone);
      const factory =
        app.componentFactoryResolver.resolveComponentFactory(AppComponent);
      ngZoneRef.run(() => {
        appRef.bootstrap(factory, el);
      });
      platformRef = app.injector.get(PlatformRef);
    });
  return {
    onUnmount() {
      platformRef.destroy();
    },
  };
}

if (isDevMode()) {
  const devRoot: HTMLElement = document.querySelector('#_<%= name %>-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
