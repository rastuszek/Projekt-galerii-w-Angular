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
    this.title = 'Interesujące zwierzęta';
    this.description = 'Tutaj możemy znaleźć zdjęcia wielu ciekawych zwierząt!';
    this.http.get('http://project.usagi.pl/gallery',
      this.httpOptions).toPromise().then((response: IGallery[])=> {console.log('success', response);
      this.galleries = response;
    }, (errResponse) => {console.log('error', errResponse);
    });
    this.searchValue = '';
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
      }, (errResponse) => {console.log('error', errResponse);
      });
    });
  }

  removeGalleries() {
    this.galleries.forEach((gallery: IGallery) => {
      this.http.post('http://project.usagi.pl/gallery/delete/' + gallery.galleryId, {},
        this.httpOptions).toPromise().then((response) => {
        this.galleries.splice(0, 1);console.log('success', response);}, (errResponse) => {console.log('error', errResponse);
      });
    });
  }

  removeGallery(galleryId) {
    const index = this.galleries.findIndex((gallery: IGallery) => gallery.galleryId === galleryId);
    this.http.post('http://project.usagi.pl/gallery/delete/' + galleryId, {}, this.httpOptions).toPromise().then((response) => {
      this.galleries.splice(index, 1);console.log('success', response);}, (errResponse) => {console.log('error', errResponse);
    });
  }

}

