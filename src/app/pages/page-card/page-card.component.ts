import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchesPast, LaunchesPastEntry } from 'src/app/types';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { GqlService } from '../../services/gql.service';

@Component({
    selector: 'app-page-card',
    templateUrl: './page-card.component.html',
    styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnDestroy {
    missionId: number;
    launchesPast: LaunchesPast;
    currentMission: LaunchesPastEntry;
    subscription: Subscription;
    shipsNames: string = '';

    filterMission(launchesPast: LaunchesPast): LaunchesPastEntry {
        let mission: LaunchesPastEntry = launchesPast?.entries?.filter(entry => {
            return +entry.id == this.missionId;
        })[0];
        this.shipsNames = mission?.ships?.map(entry => entry.name).join(', ');
        return mission;
    }

    constructor(
        private gqlService: GqlService,
        private storeService: StoreService,
        private route: ActivatedRoute
    ) {
        this.missionId = this.route.snapshot.params['id'];
        this.launchesPast = this.storeService.getLaunchesPast();
        this.currentMission = this.filterMission(this.launchesPast);

        this.subscription = route.params.subscribe(() => {
            this.missionId = this.route.snapshot.params['id'];
            this.currentMission = this.filterMission(this.launchesPast);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
