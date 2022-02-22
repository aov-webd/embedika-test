import { Component, OnInit } from '@angular/core';
import { GqlService } from 'src/app/gql.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    page: number = 1
    constructor(private gqlService: GqlService) { }

    ngOnInit(): void {
        this.page = Math.floor(this.gqlService.getCurOffset() / 5) + 1
    }

    incCurOffset() {
        this.gqlService.incCurOffset()
        this.page = Math.floor(this.gqlService.getCurOffset() / 5) + 1
    }

    decCurOffset() {
        this.gqlService.decCurOffset()
        this.page = Math.floor(this.gqlService.getCurOffset() / 5) + 1
    }
}
