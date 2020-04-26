import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ResponsiveModule } from 'ngx-responsive';
import { AngularResizedEventModule } from 'angular-resize-event';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageMapComponent } from './page-map/page-map.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { MapComponent } from './map/map.component';
import { FormPostComponent } from './form-post/form-post.component';
import { MarkerPostComponent } from './marker-post/marker-post.component';
import { ControlPostComponent } from './control-post/control-post.component';
import { PageFilterComponent } from './page-filter/page-filter.component';

const configResponsive = {
    breakPoints: {
        xs: {max: 576},
        sm: {min: 576, max: 768},
        md: {min: 768, max: 992},
        lg: {min: 992, max: 1200},
        xl: {min: 1200}
    },
    debounceTime: 100
  };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageMapComponent,
    PageListComponent,
    PageSearchComponent,
    MapComponent,
    FormPostComponent,
    MarkerPostComponent,
    ControlPostComponent,
    PageFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ResponsiveModule.forRoot(configResponsive),
    AngularResizedEventModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
