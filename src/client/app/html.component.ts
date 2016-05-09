import {Component, ViewEncapsulation, OnInit, OnDestroy, EventEmitter} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {SeoService} from './seo/seo.service';
import {SeoModel} from './seo/seo.model';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

@Component({
    directives: [AppComponent],
    encapsulation: ViewEncapsulation.None,
    providers: [SeoService],
    selector: 'html',
    template: `
<head>
    <base href="/">
    <title>{{seoModel.title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta charset="UTF-8">
    
    <meta name="description" [attr.content]="seoModel.description">
    <meta name="robots" [attr.content]="seoModel.robots">
    
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">  

    <script src="vendor/es6-shim.min.js"></script>
    <script src="vendor/system-polyfills.js"></script>
    <script src="vendor/shims_for_IE.js"></script>
    <script src="vendor/angular2-polyfills.js"></script>
    <script src="vendor/system.src.js"></script>
    <script src="vendor/Rx.js"></script>
    <script src="vendor/angular2.dev.js"></script>
    <script src="vendor/router.dev.js"></script>
    <script src="vendor/http.dev.js"></script>

    <script>
        System.config({
            packages: {
                client: {
                    defaultExtension: 'js'
                }
            }
        });
        System.import('client/app.js').then(null, console.error.bind(console));
    </script>
</head>
<body>
    <app>Loading...</app>
    <angular></angular>
    <bootstrap></bootstrap>
</body>
    `
})

@RouteConfig([
    {component: HomeComponent, name: 'Home', path: '/', useAsDefault: true},
    {path: '/**', redirectTo: ['Home']}
])

export class HTMLComponent implements OnInit, OnDestroy {
    public seoModel: SeoModel;
    private subscriber: EventEmitter<SeoModel>;

    /**
     * Inject SeoService
     * @param seoService
     */
    constructor(private seoService: SeoService) {
    }

    /**
     * set an empty default model and subscribe to changes on the seoService
     */
    public ngOnInit() {
        this.seoModel = new SeoModel();
        this.subscriber = this.seoService.event$.subscribe((seoModel) => {
            this.seoModel = seoModel;
        });
    }

    /**
     * unsubscribe to changes on the seoService
     */
    public ngOnDestroy() {
        this.subscriber.unsubscribe();
    }
}
