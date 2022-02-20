import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { ListEntryComponent } from './list-entry/list-entry.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        AppComponent,
        ExchangeRatesComponent,
        ListEntryComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ApolloModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: 'https://api.spacex.land/graphql',
                    }),
                };
            },
            deps: [HttpLink],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
