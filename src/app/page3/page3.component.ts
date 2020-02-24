import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExchangeService} from '../services/exchange.service';
import {merge} from 'rxjs';

@Component({
    selector: 'app-page3',
    templateUrl: './page3.component.html',
    styleUrls: ['./page3.component.less']
})
export class Page3Component implements OnInit {
    @Input()
    phone: string;
    @Output()
    response = new EventEmitter();

    constructor(private _API: ExchangeService) {
    }

    ngOnInit() {
    }

    goDone() {
        const one = this._API.pageOneDataCast;
        const two = this._API.pageTwoDataCast;
        /*merge(one, two).subscribe((value) => {
                console.log(value);
            },
            (error) => {
                console.log(error);
            },
            () => {
            });*/
        this._API.formActionSet = {action: 'done'};
    }
}
