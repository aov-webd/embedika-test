import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subscription } from "rxjs";
import { FilterOptions, FilterEntry, LaunchesPast, LaunchesPastEntry } from 'src/app/types';

const GET_DATA = gql`
    query launchesPast($rocketName: String, $missionName: String, $offset: Int) {
        launchesPastResult(limit: 5, offset:  $offset, find: {rocket_name: $rocketName, mission_name: $missionName}) {
            data {
                mission_name
                launch_year
                rocket {
                    rocket_name
                }
                id
                details
                ships {
                    name
                }
            }
            result {
                totalCount
            }
        }
        ships {
            name
        }
        rockets {
            name
        }
        ships {
            name
        }
    }
`;

@Injectable({
    providedIn: 'root'
})
export class GqlService {
    constructor(private apollo: Apollo) { }

    private filterShipsSubject = new BehaviorSubject<string[]>([]);
    filterShips = this.filterShipsSubject.asObservable();

    private filterRocketsSubject = new BehaviorSubject<string[]>([]);
    filterRockets = this.filterRocketsSubject.asObservable();

    launchesPastSubject = new BehaviorSubject<LaunchesPast>({ loading: true });
    launchesPast = this.launchesPastSubject.asObservable();

    subscription: Subscription;

    missionName = ""
    rocketName = ""
    totalCount: number = 0
    offset: number = 0;


    setRocketName(name: string) {
        this.rocketName = name
        // console.log(this.rocketName)
    }

    setMissionName(name: string) {
        this.missionName = name
        // console.log(this.missionName)
    }

    getCurOffset() {
        return this.offset
    }

    rmCurOffset() {
        this.offset = 0
    }

    incCurOffset() {
        this.offset = ((this.offset + 5) > this.totalCount) ? this.offset : this.offset + 5
        this.getGqlData()
    }

    decCurOffset() {
        this.offset = ((this.offset - 5) < 0) ? this.offset : this.offset - 5
        this.getGqlData()
    }

    getGqlData() {
        this.subscription = this.apollo
            .watchQuery({
                query: GET_DATA,
                variables: {
                    rocketName: this.rocketName,
                    missionName: this.missionName,
                    offset: this.offset
                },
            })
            .valueChanges.subscribe((result: any) => {
                this.launchesPastSubject.next({
                    loading: result.loading,
                    entries: result?.data?.launchesPastResult?.data?.map((entry: LaunchesPastEntry) => entry)
                })
                this.filterShipsSubject.next(result?.data?.launchesPastResult?.data?.ships?.map((entry: FilterEntry) => entry.name));
                this.filterRocketsSubject.next(result?.data?.rockets?.map((entry: FilterEntry) => entry.name));
                this.totalCount = result?.data?.launchesPastResult?.result?.totalCount
                // this.error = result.error;
                this.subscription.unsubscribe();
            });
    }
}
