import { Injectable, Component, Input, SimpleChanges } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'class-test-component',
    templateUrl: './class-test.component.html'
})
export class ClassTestComponent {
    @Input() class: any;
    @Input() test: any;
    @Input() testParams: any;
    @Input() selLang: string;

    constructor() {
    }
}
