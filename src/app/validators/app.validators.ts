import {AbstractControl} from '@angular/forms';

export class AppValidators {
  static checkPesel(control: AbstractControl) {
    const pesel = control.value;
    if (!pesel || pesel.length === 0) {
      return {invalidData: false};
    }
    const regExp = /^[0-9]{11}$/;
    const valid1 = regExp.test(pesel);
    if (!valid1) {
      return {invalidData: true};
    }

    const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    const controlNumber = parseInt(pesel.substring(10, 11), 10);
    for (let i = 0; i < weight.length; i++) {
      sum += (parseInt(pesel.substring(i, i + 1), 10) * weight[i]);
    }
    sum = sum % 10;
    // return 10 - sum === controlNumber;
    return (10 - sum === controlNumber) ? null : {invalidData: true};
  }

  static checkPhone(control: AbstractControl) {
    if (!control.value || control.value.length === 0) {
      return {invalidData: false};
    }
    const regExp = /^((\+|0{2})48|0){0,1}([- ]{0,1}[0-9]{3}){3}$/;
    const valid = regExp.test(control.value);
    return valid ? null : {invalidData: true};
  }

  static checkPassword(control: AbstractControl) {
    if (!control.value || control.value.length === 0) {
      return {invalidData: false};
    }
    if (control.value.length < 10) {
      return {invalidData: true};
    }
    const minLevel = 3;
    let level = 0;
    const figureRegExp = /^.*[0-9]{1,}.*$/;
    const capitalRegExp = /^.*[A-ZŻŹĆĄŚĘŁÓŃ]{1,}.*$/;
    const lowerCaseRegExp = /^.*[a-zżźćńółęąś]{1,}.*$/;
    const specialRegExp = /^.*[!@#\$%\^&\*\(\)_\+=\-<>\?\/\.,:\"\|\\';\{\}\]\[]{1,}.*$/;
    if (figureRegExp.test(control.value)) {
      level++;
    }
    if (capitalRegExp.test(control.value)) {
      level++;
    }
    if (lowerCaseRegExp.test(control.value)) {
      level++;
    }
    if (specialRegExp.test(control.value)) {
      level++;
    }
    return (level >= minLevel) ? null : {invalidData: true};
  }


  static checkEmail(control: AbstractControl) {
    if (!control.value || control.value.length === 0) {
      return {invalidData: false};
    }
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regExp.test(control.value);
    return valid ? null : {invalidData: true};
  }
  static checkLogin(control: AbstractControl) {
    const regExp = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9]{8,16}$/;
    const valid = regExp.test(control.value);
    return valid ? null : {invalidData: true};
  }

  static checkBox(control: AbstractControl) {
    const valid = control.value;
    return valid ? null : {invalidData: true};
  }

  static crossFieldPasswordValidator(control: AbstractControl) {
    const pass1 = control.get('pass1');
    const pass2 = control.get('pass2');
    return (pass1 && pass2 && pass1.value === pass2.value) ? null : { differentPasswords: false };
  }
  static crossFieldLoginValidator(control: AbstractControl) {
    const login = control.get('login');
    const email = control.get('email');
    return login && email && login.value !== email.value ? null : { invalidData: false };
  }
}
