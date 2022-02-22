import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subscription } from "rxjs";
import { FilterOptions, FilterEntry, LaunchesPast, LaunchesPastEntry } from 'src/app/types';

const GET_DATA = gql`
    query getLaunchesPast($rocketName: String, $missionName: String, $offset: Int) {
        launchesPast(limit: 5, offset:  $offset, find: {rocket_name: $rocketName, mission_name: $missionName}) {
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
        ships {
            name
        }
        rockets {
            name
        }
        ships {
            name
        }
        launchesPastResult {
            result {
                totalCount
            }
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

    shipName = ""
    missionName = ""
    rocketName = ""
    offset = 0
    totalCount: number = 0

    setShipName(name: string) {
        this.shipName = name
        // console.log(this.shipName)
    }

    setRocketName(name: string) {
        this.rocketName = name
        // console.log(this.rocketName)
    }

    setMissionName(name: string) {
        this.missionName = name
        // console.log(this.missionName)
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
                    entries: result?.data?.launchesPast?.map((entry: LaunchesPastEntry) => entry)
                })
                this.filterShipsSubject.next(result?.data?.ships?.map((entry: FilterEntry) => entry.name));
                this.filterRocketsSubject.next(result?.data?.rockets?.map((entry: FilterEntry) => entry.name));
                this.totalCount = result?.data?.launchesPastResult?.result?.totalCount
                // this.error = result.error;
                this.subscription.unsubscribe();
            });
    }
}
