import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCardComponent } from './page-card/page-card.component';
import { PageListComponent } from './page-list/page-list.component';

const routes: Routes = [
    { path: 'mission/:id', component: PageCardComponent },
    { path: '', component: PageListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
