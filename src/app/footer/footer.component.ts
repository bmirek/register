import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExchangeService} from '../services/exchange.service';
import {EtapPipe} from '../pipes/etap.pipe';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
    @Input()
    page: string;
    @Output()
    response = new EventEmitter();

    constructor(private _API: ExchangeService) {
    }
    ngOnInit() {}

    clear() {}

    sendResponse(e: any) {
        this.response.emit(e);
    }
}
