import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LaunchesPast, QueryParamsT } from './types';

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
    private rocketNamesSubject = new BehaviorSubject<string[]>([])
    private launchesPastSubject = new BehaviorSubject<LaunchesPast>({ loading: true });

    queryParams = this.queryParamsSubject.asObservable();
    rocketNames = this.rocketNamesSubject.asObservable();
    launchesPast = this.launchesPastSubject.asObservable();

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

    setOffset(value: number) {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            offset: value
        })
    }

    setMissionName(value: string) {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            missionName: value
        })
    }

    setRocketName(value: string) {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            rocketName: value
        })
    }

    setAllRocketNames(value: string[]) {
        this.rocketNamesSubject.next(value)
    }

    setLaunchesPast(value: LaunchesPast) {
        this.launchesPastSubject.next(value)
    }

    getLaunchesPast(): LaunchesPast {
        return this.launchesPastSubject.getValue()
    }
}
