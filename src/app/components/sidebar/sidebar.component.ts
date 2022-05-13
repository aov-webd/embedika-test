import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { GqlService } from '../../services/gql.service';
import { StoreService } from '../../services/store.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnDestroy {
    missionName: string = '';

    filterRockets: string[];
    filterRocketsValue: string = '';
    queryParamsSubscription: Subscription;
    rocketNamesSubscription: Subscription;
    constructor(
        private gqlService: GqlService,
        private storeService: StoreService
    ) {
        this.queryParamsSubscription = this.storeService.queryParams.subscribe({
            next: (data) => {
                this.filterRocketsValue = data.rocketName;
            }
        });
        this.rocketNamesSubscription = this.storeService.rocketNames.subscribe({
            next: (data) => {
                this.filterRockets = data;
            }
        });
    }

    ngOnInit(): void {
    }

    setMissionName(value: string): void {
        this.storeService.setMissionName(value);
        this.storeService.setOffset(0);
    }

    filterRocketsChoose(value: string) {
        this.storeService.setRocketName(value);
        this.storeService.setOffset(0);
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
        this.rocketNamesSubscription.unsubscribe();
    }
}
