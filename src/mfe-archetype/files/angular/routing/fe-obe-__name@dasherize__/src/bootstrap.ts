import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {
  ApplicationRef,
  enableProdMode,
  NgZone,
  PlatformRef,
  isDevMode,
} from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { RoutingService } from './app/services/routing.service';

if (environment.production) {
  try {
    enableProdMode();
    // console.warn('BUGFIX: calling isDevMode() in imports before enableProdMode() throws exception - https://github.com/angular/angular-cli/issues/8340#\n', exception);
  } catch (error) {}
}

let platformRef: PlatformRef;
let ngZoneRef: NgZone;
let routingService: RoutingService;

function mount(el: HTMLElement, { onNavigate }) {
  platformBrowserDynamic([{ provide: '_onNavigation', useValue: onNavigate }])
    .bootstrapModule(AppModule)
    .then((app) => {
      const appRef = app.injector.get(ApplicationRef);
      const factory =
        app.componentFactoryResolver.resolveComponentFactory(AppComponent);
      routingService = app.injector.get(RoutingService);
      ngZoneRef = app.injector.get(NgZone);
      ngZoneRef.run(() => appRef.bootstrap(factory, el));
      platformRef = app.injector.get(PlatformRef);
    });
  return {
    onParentNavigate({ pathname: nextPathName }) {
      const location = routingService.location();
      if (location !== nextPathName) {
        routingService.navigateInMemory(nextPathName);
      }
    },
    onUnmount() {
      platformRef.destroy();
    },
  };
}

if (isDevMode()) {
  const devRoot: HTMLElement = document.querySelector('#_<%= name %>-dev-root');
  if (devRoot) {
    mount(devRoot, { onNavigate: null });
  }
}

export { mount };
