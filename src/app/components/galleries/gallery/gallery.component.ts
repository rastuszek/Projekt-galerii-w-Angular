import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from "../../../interfaces/IGallery";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IPhoto} from "../../../interfaces/iphoto";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

          galleryId: string;
          gallery: IGallery;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '52'
    })
  };

  photo: IPhoto;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
      this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    this.http.get('http://project.usagi.pl/gallery/'+this.galleryId,
      this.httpOptions).toPromise().then((response: IGallery)=> {console.log('success', response);
      this.gallery = response;
      this.photo = this.gallery.photos[0];
      console.log(this.gallery);
    }, (errResponse) => {console.log('error', errResponse);
    });

  }

  onClick(photo) {
    this.photo = photo;
  }

}
