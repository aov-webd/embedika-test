import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { GqlService } from '../gql.service';
import { StoreService } from '../store.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    missionName: string = '';

    filterRockets: string[];
    filterRocketsValue: string = '';

    constructor(
        private gqlService: GqlService,
        private storeService: StoreService
    ) {
        this.storeService.queryParams.subscribe({
            next: (data) => {
                this.filterRocketsValue = data.rocketName
            }
        })
        this.storeService.rocketNames.subscribe({
            next: (data) => {
                this.filterRockets = data
            }
        })
    }

    ngOnInit(): void {
    }

    setMissionName(value: string): void {
        this.storeService.setMissionName(value)
        this.storeService.setOffset(0)
    }

    filterRocketsChoose(value: string) {
        this.storeService.setRocketName(value)
        this.storeService.setOffset(0)
    }
}
