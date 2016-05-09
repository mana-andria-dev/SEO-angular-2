import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './app/app.component';
import {SeoService} from './app/seo/seo.service';

/**
 * Bootstrap SeoService to have one Instance for the whole
 * Application
 */
bootstrap(AppComponent, [ROUTER_PROVIDERS, SeoService]);
