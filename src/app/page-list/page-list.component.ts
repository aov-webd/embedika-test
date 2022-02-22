import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GqlService } from '../gql.service';
import { FilterOptions, LaunchesPast } from '../types';

@Component({
    selector: 'app-page-list',
    templateUrl: './page-list.component.html',
    styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
    subscription: Subscription;
    launchesPast: LaunchesPast = { loading: true };

    constructor(private gqlService: GqlService) { }

    ngOnInit(): void {
        this.subscription = this.gqlService.launchesPast
            .subscribe(launchesPast => {
                this.launchesPast = launchesPast
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
