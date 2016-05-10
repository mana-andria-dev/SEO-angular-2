import {Component} from 'angular2/core';
import {SeoService} from '../seo/seo.service';
import {SeoModel} from '../seo/seo.model';


@Component({
    directives: [],
    pipes: [],
    providers: [],
    selector: 'home',
    template: `
        Home Component Andriamamonjy Laza
    `
})
export class HomeComponent {
    /**
     * Inject seoService and set a SeoModel for this specific application state
     * @param seoService
     */
    constructor(private seoService: SeoService) {
        let seoModel: SeoModel = <SeoModel> {
            description: 'AwesomeSeoDescription',
            robots: 'index, follow',
            title: 'AwesomeSeoTitle'
        };
        seoService.set(seoModel);
    }
}
