import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageMapComponent } from './page-map/page-map.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageFilterComponent } from './page-filter/page-filter.component';


const routes: Routes = [
  // { path: 'post', component: PageListComponent },
  { path: 'post', component: PageFilterComponent },
  { path: 'map', component: PageMapComponent },
  { path: '', component: PageMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
