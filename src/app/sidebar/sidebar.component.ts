import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { GqlService } from '../gql.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    subscription: Subscription;
    missionName: string = '';

    filterRockets: string[];
    filterRocketsValue: string = '';

    getGqlData = new Subject();

    constructor(private gqlService: GqlService) { }
    ngOnInit(): void {
        this.getGqlData.pipe(debounceTime(700))
            .subscribe(data => {
                this.gqlService.getGqlData()
                return
            });

        this.getGqlData.next('')

        this.subscription = this.gqlService.filterRockets
            .subscribe(filterRockets => {
                this.filterRockets = filterRockets
            })
        this.missionName = this.gqlService.missionName
        this.filterRocketsValue = this.gqlService.rocketName
    }

    setMissionName(name): void {
        this.gqlService.setMissionName(name)
        this.getGqlData.next('')
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filterRocketsChoose(value) {
        this.gqlService.rmCurOffset()
        this.filterRocketsValue = value
        this.gqlService.setRocketName(value)
        this.getGqlData.next('')
    }
}
