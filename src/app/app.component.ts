import {Component, OnInit} from '@angular/core';
import {ExchangeService} from './services/exchange.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
    whichOne: any = 'Page1';
    email: string;
    page: string;

    constructor(private _API: ExchangeService) {
    }

    getResponse(param: any) {}
    clearAll() {
        this._API.pageOneDataSet = {fName: '', lName: '', pesel: '', email: '', phone: ''};
        this._API.pageTwoDataSet = {login: '', pass1: '', pass2: '', email: '', accept: false};
    }

    ngOnInit(): void {
        this.page = '1';
        this.email = '';
        this.clearAll();
        this._API.formActionCast.subscribe(
            (value: any) => {
                switch (value.action) {
                    case 'done':
                        this.clearAll();
                    case 'back':
                    case 'clear':
                        this.whichOne = 'Page1';
                        this.page = '1';
                        break;
                    case 'next':
                        this._API.pageOneDataCast
                            .pipe(
                                map((value1: any) => {
                                    return value1.email;
                                })
                            )
                            .subscribe(value2 => {
                                this.email = value2;
                            });
                        this.whichOne = 'Page2';
                        this.page = '2';
                        break;
                    case 'ready':
                        this.whichOne = 'Page3';
                        this.page = '3';
                        break;
                    default:
                        break;
                }
            });
    }
}
