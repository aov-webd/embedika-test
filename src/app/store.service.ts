import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueryParamsT } from './types';

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    private queryParamsSubject = new BehaviorSubject<QueryParamsT>(
        {
            rocketName: '',
            missionName: '',
            offset: 0
        }
    );
    queryParams = this.queryParamsSubject.asObservable();

    constructor() { }

    incOffset() {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            offset: this.queryParamsSubject.getValue().offset + 1
        })
    }

    decOffset() {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            offset: this.queryParamsSubject.getValue().offset - 1
        })
    }
}
