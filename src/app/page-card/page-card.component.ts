import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GqlService } from '../gql.service';
import { LaunchesPast, LaunchesPastEntry } from 'src/app/types';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-page-card',
    templateUrl: './page-card.component.html',
    styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {
    missionId: number
    launchesPast: LaunchesPast
    currentMission: LaunchesPastEntry
    subscription: Subscription;
    shipsNames: string = ''

    filterMission(launchesPast: LaunchesPast): LaunchesPastEntry {
        let mission: LaunchesPastEntry = launchesPast?.entries?.filter(entry => {
            return +entry.id == this.missionId
        })[0]
        this.shipsNames = mission?.ships?.map(entry => entry.name).join(', ')
        return mission
    }

    constructor(
        private gqlService: GqlService,
        private route: ActivatedRoute
    ) {
        this.missionId = this.route.snapshot.params['id'];

        this.launchesPast = gqlService.launchesPastSubject.getValue();
        this.currentMission = this.filterMission(this.launchesPast)

        route.params.subscribe(() => {
            this.missionId = this.route.snapshot.params['id'];
            this.currentMission = this.filterMission(this.launchesPast)
        });

        this.subscription = this.gqlService.launchesPast
            .subscribe(launchesPast => {
                this.launchesPast = launchesPast;
                this.currentMission = this.filterMission(launchesPast)
            })
    }

    ngOnInit(): void {
    }
}
