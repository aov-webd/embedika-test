import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
    selector: 'exchange-rates',
    template: `
    <button (click)="setQuertType1()">set query type 1</button>
    <button (click)="setQuertType2()">set query type 2</button>
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="ships">
      <div *ngFor="let ship of ships">
        <p>{{ ship.name }}</p>
      </div>
    </div>
  `,
})
export class ExchangeRatesComponent implements OnInit {
    ships: any[];
    loading = true;
    error: any;
    testQuery: string[] = ['currency', 'rate']

    constructor(private apollo: Apollo) { }
    setQuertType1() {
        this.testQuery = ['rate']
    }
    setQuertType2() {
        this.testQuery = ['currency']
    }
    ngOnInit() {
        this.apollo
            .watchQuery({
                query: gql`
                    {
                        ships {
                            name
                        }
                    }
                `,
            })
            .valueChanges.subscribe((result: any) => {
                this.ships = result?.data?.ships;
                this.loading = result.loading;
                this.error = result.error;
                console.log(this.ships)
            });
    }
}
