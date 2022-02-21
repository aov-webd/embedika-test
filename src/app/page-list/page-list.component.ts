import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GqlService } from '../gql.service';
import { FilterCheckboxOptions } from '../types';

@Component({
    selector: 'app-page-list',
    templateUrl: './page-list.component.html',
    styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
    subscription: Subscription;
    filterVariants: FilterCheckboxOptions = {};

    constructor(private gqlService: GqlService) { }

    ngOnInit(): void {
        this.subscription = this.gqlService.filterVariants
            .subscribe(filterVariants => {
                this.filterVariants = filterVariants
                console.log('PAGELIST: ' + this.filterVariants)
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
