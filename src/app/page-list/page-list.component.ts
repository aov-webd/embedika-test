import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../store.service';
import { FilterOptions, LaunchesPast } from '../types';

@Component({
    selector: 'app-page-list',
    templateUrl: './page-list.component.html',
    styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
    subscription: Subscription;
    launchesPast: LaunchesPast = { loading: true };

    constructor(private storeService: StoreService) { }

    ngOnInit(): void {
        this.subscription = this.storeService.launchesPast
            .subscribe(launchesPast => {
                this.launchesPast = launchesPast
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
