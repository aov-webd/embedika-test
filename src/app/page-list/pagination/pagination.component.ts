import { Component, OnInit } from '@angular/core';
import { GqlService } from 'src/app/gql.service';
import { StoreService } from 'src/app/store.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    page: number = 1
    constructor(
        private gqlService: GqlService,
        private storeService: StoreService
    ) { }

    ngOnInit(): void {
    }

    incCurOffset() {
        this.storeService.incOffset()
    }

    decCurOffset() {
        this.storeService.decOffset()
    }
}
