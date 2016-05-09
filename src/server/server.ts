import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

/**
 * Angular 2 universal
 */
import 'angular2-universal/polyfills';
import {
    NODE_ROUTER_PROVIDERS,
    NODE_HTTP_PROVIDERS,
    NODE_PLATFORM_PIPES,
    REQUEST_URL,
    BASE_URL,
    ORIGIN_URL,
    queryParamsToBoolean,
    BootloaderConfig,
    expressEngine
} from 'angular2-universal';

import {provide, enableProdMode} from 'angular2/core';

import {
    ROUTER_PROVIDERS
} from 'angular2/router';

/**
 * HTML Component to manipulate title and meta tags
 */
import {HTMLComponent} from '../client/app/html.component';

let app = express();
let root = path.join(path.resolve(__dirname, '..'));

enableProdMode();

/**
 * Render ng2.html files with the Angular 2 Universal ExpressEngine
 */
app.engine('ng2.html', expressEngine);
app.set('views', root);
app.set('view engine', 'ng2.html');
app.set('view options', {doctype: 'html'});
app.set('json spaces', 2);

/**
 * body parser for api
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * static content for Angular 2 application
 */
app.use(express.static(root, {index: false}));

/**
 * Render Angular 2 Application
 * @param req
 * @param res
 */
function ngApp(req, res) {
    let baseUrl = '/';
    let url = req.originalUrl || '/';

    let queryParams = queryParamsToBoolean(req.query);
    let options: BootloaderConfig = Object.assign(queryParams, {
        async: true,
        buildClientScripts: false,
        data: {},
        directives: [HTMLComponent],
        ngOnRendered: () => {
            console.log('DONE');
        },
        preboot: false,
        providers: [
            provide(ORIGIN_URL, {useValue: 'http://localhost:3000'}),
            provide(BASE_URL, {useValue: baseUrl}),
            provide(REQUEST_URL, {useValue: url}),
            ROUTER_PROVIDERS,
            NODE_PLATFORM_PIPES,
            NODE_ROUTER_PROVIDERS,
            NODE_HTTP_PROVIDERS
        ]
    });

    res.render('index', options);
}

/**
 * RESTful API Routes
 */
// app.use('/api/login', (req, res) => {});

/**
 * render Angular 2 application on every Route
 */
app.get('/**', ngApp);

/**
 * start server on port 3000
 */
app.listen(process.env.PORT || 3000, function() {
        console.log('Listen on http://localhost:3000');
})
