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
    shipName: string = ''
    filterShips: FilterOptions = { title: 'Корабли' }

    constructor(private gqlService: GqlService) { }
    ngOnInit(): void {
        this.gqlService.getGqlData()
        this.subscription = this.gqlService.filterShips
            .subscribe(filterShips => {
                this.filterShips.entries = filterShips
                console.log(this.filterShips)
            })
    }

    setShipName(name): void {
        this.gqlService.setShipName(name)
        this.gqlService.getGqlData()
    }

    setMissionName(name): void {
        this.gqlService.setShipName(name)
        this.gqlService.getGqlData()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
