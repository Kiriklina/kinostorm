import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { CatalogComponent } from './catalog/catalog.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectionComponent } from './selection/selection.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    CatalogComponent,
    WatchListComponent,
    CheckboxComponent,
    SelectionComponent,
    ComingSoonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
