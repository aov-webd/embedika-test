import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-name',
    templateUrl: './filter-name.component.html',
    styleUrls: ['./filter-name.component.scss'],

})
export class FilterNameComponent implements OnInit {
    @Input() text: string;
    @Output() textChanged = new EventEmitter<string>();
    constructor() { }

    ngOnInit(): void {
    }

    onTextChange(value: string) {
        this.textChanged.emit(value);
    }
}
