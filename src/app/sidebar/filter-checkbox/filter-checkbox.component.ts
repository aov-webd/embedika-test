import { Component, Input, OnInit } from '@angular/core';
import { FilterCheckboxOptions, FilterCheckboxEntry } from 'src/app/types';

@Component({
    selector: 'app-filter-checkbox',
    templateUrl: './filter-checkbox.component.html',
    styleUrls: ['./filter-checkbox.component.scss']
})
export class FilterCheckboxComponent implements OnInit {
    @Input() options: FilterCheckboxOptions;

    numSelected: number = 0;
    permissions: FilterCheckboxEntry[];
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
