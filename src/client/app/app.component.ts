import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent} from './home/home.component';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'app',
    template: `
<router-outlet></router-outlet>
    `
})

@RouteConfig([
    {component: HomeComponent, name: 'Home', path: '/', useAsDefault: true},
    {path: '/**', redirectTo: ['Home']}
])

export class AppComponent {
}
