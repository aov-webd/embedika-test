import { Component, OnInit } from '@angular/core';
import { GqlService } from '../gql.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor(private gqlService: GqlService) { }
    shipName: string = ''
    ngOnInit(): void {
        this.gqlService.getFilterVariants()
    }

    setShipName(name): void {
        this.gqlService.setShipName(name)
        this.gqlService.getFilterVariants()
    }
}
