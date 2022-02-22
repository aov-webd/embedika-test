import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCardComponent } from './page-card/page-card.component';
import { HomepageComponent } from './homepage/homepage.component';
const routes: Routes = [
    { path: 'mission/:id', component: PageCardComponent },
    { path: '', component: HomepageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
