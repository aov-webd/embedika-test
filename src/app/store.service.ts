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
    private rocketNamesSubject = new BehaviorSubject<string[]>([]);
    private launchesPastSubject = new BehaviorSubject<LaunchesPast>({ loading: true });
    private totalCount: number;

    queryParams = this.queryParamsSubject.asObservable();
    rocketNames = this.rocketNamesSubject.asObservable();
    launchesPast = this.launchesPastSubject.asObservable();

    constructor() { }

    incOffset() {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            offset:
                (this.queryParamsSubject.getValue().offset + 5) >= this.totalCount ?
                    this.queryParamsSubject.getValue().offset :
                    this.queryParamsSubject.getValue().offset + 5
        })
    }

    decOffset() {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            offset: (this.queryParamsSubject.getValue().offset - 5) <= 0 ?
                0 :
                this.queryParamsSubject.getValue().offset - 5

        })
    }

    setOffset(value: number) {
        this.queryParamsSubject.next({
            ...this.queryParamsSubject.getValue(),
            offset: value
        })
    }

    getOffset(): number {
        return this.queryParamsSubject.getValue().offset
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

    setTotalCount(value: number) {
        this.totalCount = value
    }
}
