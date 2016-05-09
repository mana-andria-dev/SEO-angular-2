import {Injectable, EventEmitter} from 'angular2/core';
import {SeoModel} from './seo.model';

@Injectable()
export class SeoService {
    public event$: EventEmitter<SeoModel>;
    private seoModel: SeoModel;

    constructor() {
        this.event$ = new EventEmitter();
        this.seoModel = new SeoModel();
    }

    /**
     * set seoModel and emit event
     * @param seoModel
     */
    public set(seoModel: SeoModel): void {
        this.seoModel = seoModel;
        this.emit();
    }

    /**
     * private emit function to avoid duplicate code
     */
    private emit(): void {
        this.event$.emit(this.seoModel);
    }
}
