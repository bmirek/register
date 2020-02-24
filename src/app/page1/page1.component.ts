import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {AppValidators} from '../validators/app.validators';
import {ExchangeService} from '../services/exchange.service';

export interface IPage1 {
    fName: string;
    lName: string;
    pesel: string;
    email: string;
    phone: string;
}

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.less']
})
export class Page1Component implements OnInit {

    // +48 258 258 654
    // 0048 258 258 654
    // +48258258654
    // +48-258-258-654
    // 0048258258654
    // 0048-258-258-654
    // 489992221
    // 0123456789
    // 0-123-456-789
    // 0 123 456 789

    private formOne: FormGroup;
    private gotOne: IPage1;

    required(value: string) {
        return (
            this.formOne.get(value).hasError('required') &&
            this.formOne.get(value).touched
        );
    }

    isDataValid(value: string) {
        return this.formOne.get(value).hasError('invalidData');
    }

    constructor(private _FB: FormBuilder,
                private _API: ExchangeService) {
    }

    ngOnInit() {
        this._API.pageOneDataCast.subscribe(
            (value: IPage1) => {
                this.gotOne = value;
                this.formOne = this._FB.group({
                    fName: [(this.gotOne.fName) ? this.gotOne.fName : '', [Validators.required, Validators.minLength(2)]],
                    lName: [(this.gotOne.lName) ? this.gotOne.lName : '', [Validators.required, Validators.minLength(2)]],
                    pesel: [(this.gotOne.pesel) ? this.gotOne.pesel : '', [Validators.required, AppValidators.checkPesel]],
                    email: [(this.gotOne.email) ? this.gotOne.email : '', [Validators.required, AppValidators.checkEmail]],
                    phone: [(this.gotOne.phone) ? this.gotOne.phone : '', [Validators.required, AppValidators.checkPhone]]
                });
            },
            (error) => {
                console.log(error);
            },
            () => {
            });
    }

    onSubmit() {
        this.goNext();
    }

    goNext() {
        if (this.formOne.invalid) {
            return;
        }
        this._API.pageOneDataSet = this.formOne.value;
        this._API.formActionSet = {action: 'next'};
    }

    goClear() {
        this.formOne.reset();
        this._API.pageOneDataSet = this.formOne.value;
        this._API.pageTwoDataSet = {login: null, pass1: null, pass2: null, accept: false};
        this._API.formActionSet = {action: 'clear'};
    }
}

