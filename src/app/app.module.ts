import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { ListEntryComponent } from './list-entry/list-entry.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterCheckboxComponent } from './sidebar/filter-checkbox/filter-checkbox.component';
import { FilterNameComponent } from './sidebar/filter-name/filter-name.component';
import { FilterRadioComponent } from './sidebar/filter-radio/filter-radio.component';
import { FormsModule } from '@angular/forms';
import { GqlService } from './gql.service';
import { PageListComponent } from './page-list/page-list.component';
import { PageCardComponent } from './page-card/page-card.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    declarations: [
        AppComponent,
        ListEntryComponent,
        SidebarComponent,
        FilterCheckboxComponent,
        FilterNameComponent,
        FilterRadioComponent,
        PageListComponent,
        PageCardComponent,
        HomepageComponent,
        PaginationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ApolloModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({ uri: 'https://api.spacex.land/graphql' }),
                };
            },
            deps: [HttpLink],
        },
        GqlService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
