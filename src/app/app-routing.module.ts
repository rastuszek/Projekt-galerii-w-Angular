import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { GalleriesComponent} from "./components/galleries/galleries/galleries.component";
import { DashboardComponent} from "./components/dashboard/dashboard/dashboard.component";
import {GalleryComponent} from "./components/galleries/gallery/gallery.component";

const routes: Routes = [{
  path: 'galleries',
  component: GalleriesComponent
}, {
  path: 'galleries/:galleryId',
  component: GalleryComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
