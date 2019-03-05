import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PolishDatePipe } from './pipes/polish-date.pipe';
import { SearchGalleriesPipe } from './pipes/search-galleries.pipe';
import { NavComponent } from './components/nav/nav.component';
import { GalleriesComponent } from './components/galleries/galleries/galleries.component';
import { GalleryItemComponent } from './components/galleries/gallery-item/gallery-item.component';
import { GallerySearchComponent } from './components/galleries/gallery-search/gallery-search.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { GalleryComponent } from './components/galleries/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    PolishDatePipe,
    SearchGalleriesPipe,
    NavComponent,
    GalleriesComponent,
    GalleryItemComponent,
    GallerySearchComponent,
    DashboardComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
