import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-radio',
    templateUrl: './filter-radio.component.html',
    styleUrls: ['./filter-radio.component.scss']
})
export class FilterRadioComponent implements OnInit {
    @Input() title: string;
    @Input() groupName: string;
    @Input() choices: string[];
    @Input() defaultChoice: string;
    @Input() value: string;
    @Output() valueChosen: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
        this.choose(this.defaultChoice);
    }

    choose(value: string) {
        this.valueChosen.emit(value);
    }
}
