import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {AppValidators} from '../validators/app.validators';
import {ExchangeService} from '../services/exchange.service';
import {forkJoin, merge} from 'rxjs';
import {IPage1} from '../page1/page1.component';

export interface IPage2 {
    login: string;
    pass1: string;
    pass2: string;
    accept: string;
    email?: boolean;
}

@Component({
    selector: 'app-page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.less']
})
export class Page2Component implements OnInit {
    @Input()
    email: string;

    private formTwo: FormGroup;
    private isPasswordVisible = false;
    private isConfirmVisible = false;

    required(value: string) {
        return (
            this.formTwo.get(value).hasError('required') &&
            this.formTwo.get(value).touched
        );
    }

    isChecked(value: string) {
        return (
            this.formTwo.get(value).value !== true &&
            this.formTwo.get(value).touched
        );
    }

    // passwordIdentity
    isDataValid(value: string) {
        return (this.formTwo.get(value).hasError('invalidData')
            && this.formTwo.get(value).touched && this.formTwo.get(value).value.length > 0);
    }

    isRepeatedPasswordMatch(value: string) {

        return (this.formTwo.get('pass2').touched
            && this.formTwo.get(value).value !== this.formTwo.get('pass1').value
            && this.formTwo.get('pass2').value.length > 0);
    }

    constructor(private _FB: FormBuilder,
                private _API: ExchangeService) {
    }

    ngOnInit() {
        this._API.pageTwoDataCast.subscribe((value: any) => {
                this.formTwo = this._FB.group({
                        login: [(value.login) ? value.login : '', [Validators.required, AppValidators.checkLogin]],
                        pass1: [(value.pass1) ? value.pass1 : '', [Validators.required, AppValidators.checkPassword]],
                        pass2: [(value.pass2) ? value.pass2 : '', Validators.required],
                        accept: [(value.accept && (value.accept === true)),
                            [Validators.required, AppValidators.checkBox]],
                        email: (this.email) ? this.email : ''
                    },
                    {
                        validators: [AppValidators.crossFieldPasswordValidator, AppValidators.crossFieldLoginValidator]
                    });

            },
            () => {
            },
            () => {
            });
    }

    onSubmit() {
        if (this.formTwo.invalid) {
            return;
        }
    }

    // visibility password on | off
    onChangeClick(param: string) {
        const htmlElement = document.getElementById(param) as HTMLInputElement;
        // const iconElement = document.getElementById(param + '-icon') as HTMLElement;
        const iconOn = document.getElementById(param + '-icon-visibility') as HTMLElement;
        const iconOff = document.getElementById(param + '-icon-visibility-off') as HTMLElement;
        if (param === 'password') {
            this.isPasswordVisible = !this.isPasswordVisible;
        }
        if (param === 'confirm') {
            this.isConfirmVisible = !this.isConfirmVisible;
        }

        if (htmlElement.type === 'password') {
            htmlElement.type = 'text';
            iconOn.style.display = 'block';
            iconOff.style.display = 'none';
        } else {
            htmlElement.type = 'password';
            iconOn.style.display = 'none';
            iconOff.style.display = 'block';
        }
    }

    goBack() {
        this._API.pageTwoDataSet = this.formTwo.value;
        this._API.formActionSet = {action: 'back'};
    }

    goDone() {
        this._API.pageTwoDataSet = this.formTwo.value;
        this._API.formActionSet = {action: 'ready'};
    }

    showValidation() {
    }
}
