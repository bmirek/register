import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {

    constructor() {}

    private pageOneData = new BehaviorSubject<{}>({});
    pageOneDataCast = this.pageOneData.asObservable();
    set pageOneDataSet(changes: any) {
        this.pageOneData.next(changes);
    }

    private pageTwoData = new BehaviorSubject<{}>({});
    pageTwoDataCast = this.pageTwoData.asObservable();
    set pageTwoDataSet(changes: any) {
        this.pageTwoData.next(changes);
    }

    /**
     * value: 'next' | 'back' | 'ready' | 'done' | 'clear'
     * {action: value}
     */
    private formAction = new BehaviorSubject<{}>({});
    formActionCast = this.formAction.asObservable();
    set formActionSet(changes: any) {
        this.formAction.next(changes);
    }

    /*private userList = new BehaviorSubject<[]>([]);
    userListCast = this.userList.asObservable();
    set userListSet(changes: any) {
        this.userList.next(changes);
    }*/
}
