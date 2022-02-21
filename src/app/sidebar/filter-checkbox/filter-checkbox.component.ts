import { Component, Input, OnInit } from '@angular/core';
import { FilterOptions, FilterEntry } from 'src/app/types';

@Component({
    selector: 'app-filter-checkbox',
    templateUrl: './filter-checkbox.component.html',
    styleUrls: ['./filter-checkbox.component.scss']
})
export class FilterCheckboxComponent implements OnInit {
    @Input() options: FilterOptions;

    numSelected: number = 0;
    permissions: FilterEntry[];
    title: string;

    constructor() {
        this.permissions = this.options?.entries;
        this.title = this.options?.title;
    }

    ngOnInit(): void {
    }

    onToggle() {
        this.numSelected = this.permissions.reduce((prev: number, cur) => {
            return prev + +(cur.checked === true)
        }, 0)
    }
}
