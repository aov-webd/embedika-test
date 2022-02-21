import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GqlService } from '../gql.service';
import { FilterOptions } from '../types';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    subscription: Subscription;
    missionName: string = '';

    filterShips: string[];
    filterShipsValue: string = '';

    filterRockets: string[];
    filterRocketsValue: string = '';

    constructor(private gqlService: GqlService) { }
    ngOnInit(): void {
        this.gqlService.getGqlData()
        this.subscription = this.gqlService.filterRockets
            .subscribe(filterRockets => {
                this.filterRockets = filterRockets
                console.log(this.filterRockets)
            })
    }

    setShipName(name): void {
        this.gqlService.setShipName(name)
        this.gqlService.getGqlData()
    }

    setMissionName(name): void {
        this.gqlService.setMissionName(name)
        this.gqlService.getGqlData()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filterRocketsChoose(value) {
        this.filterRocketsValue = value
        this.gqlService.setRocketName(value)
        this.gqlService.getGqlData()
    }
}
