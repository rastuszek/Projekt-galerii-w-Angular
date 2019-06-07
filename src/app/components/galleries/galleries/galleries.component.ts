import { Component, OnInit } from '@angular/core';
import {Galleries} from '../../../constants/galleries.constant';
import {IGallery} from '../../../interfaces/IGallery';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {

  showGalleryForm: boolean;
  limit:number;
  currentPage:number;
  start:number;
  end:number;
  numberOfPages:any=[];
  title: string;
  description: string;
  galleries: IGallery[];
  searchValue: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '52'
    })
  };




  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.showGalleryForm = false;
    this.searchValue = '';
    this.currentPage = parseInt(localStorage.getItem('galleryPage')) || 0;
    this.setCurrentPage(this.currentPage);
    this.setCurrentPage();
    this.title = 'Interesujące zwierzęta';
    this.description = 'Tutaj możemy znaleźć zdjęcia wielu ciekawych zwierząt!';
    this.http.get('http://project.usagi.pl/gallery',
      this.httpOptions).toPromise().then((response: IGallery[])=> {console.log('success', response);
      this.galleries = response;
      this.numberOfPages = Array(Math.ceil(this.galleries.length / this.limit)).fill(1);
    }, (errResponse) => {console.log('error', errResponse);
    });
  }


  setSearchValue($event) {
    console.log($event);
    this.searchValue = $event;
  }

  exportGalleries() {
    Galleries.forEach((gallery: IGallery) => {
      delete(gallery.galleryId);
      this.http.post('http://project.usagi.pl/gallery', gallery,
        this.httpOptions).toPromise().then((response: IGallery) => {console.log('success', response);
        this.galleries.push(response);
        this.numberOfPages = Array(Math.ceil(this.galleries.length / this.limit)).fill(1);
      }, (errResponse) => {console.log('error', errResponse);
      });
    });
  }

  removeGalleries() {
    this.galleries.forEach((gallery: IGallery) => {
      this.http.post('http://project.usagi.pl/gallery/delete/' + gallery.galleryId, {},
        this.httpOptions).toPromise().then((response) => {
        this.numberOfPages = Array(Math.ceil(this.galleries.length / this.limit)).fill(1);
        this.galleries.splice(0, 1);console.log('success', response);}, (errResponse) => {console.log('error', errResponse);
        });
    });
  }

  removeGallery(galleryId) {
    const index = this.galleries.findIndex((gallery: IGallery) => gallery.galleryId === galleryId);
    this.http.post('http://project.usagi.pl/gallery/delete/' + galleryId, {}, this.httpOptions).toPromise().then((response) => {
      this.numberOfPages = Array(Math.ceil(this.galleries.length / this.limit)).fill(1);
      this.galleries.splice(index, 1);console.log('success', response);}, (errResponse) => {console.log('error', errResponse);
    });
  }

  setCurrentPage(page=1) {
    this.limit = 3;
    this.currentPage = page;
    this.start = this.currentPage * this.limit;
    this.end = this.start + 3;
    localStorage.setItem('galleryPage', this.currentPage.toString());
  }

  saveGallery(event) {
    this.http.post('http://project.usagi.pl/gallery', event,
      this.httpOptions).toPromise().then((response:IGallery) => {
      this.galleries.push(response);
      this.numberOfPages = Array(Math.ceil(this.galleries.length / this.limit)).fill(1);
      this.showGalleryForm = false;
    });
  }

}

