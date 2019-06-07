import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGallery} from "../../../interfaces/IGallery";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IPhoto} from "../../../interfaces/iphoto";
import {IComment} from "../../../interfaces/IComment";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  showGalleryDetails:boolean;
  comments: any=[];
  galleryId: string;
  gallery?: IGallery;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '52'
    })
  };

  photo: IPhoto;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.showGalleryDetails = false;
    this.galleryId = this.route.snapshot.paramMap.get('galleryId');
    this.http.get('http://project.usagi.pl/gallery/'+this.galleryId,
      this.httpOptions).toPromise().then((response: IGallery)=> {console.log('success', response);
      this.gallery = response;
      this.photo = this.gallery.photos[0];
      console.log(this.gallery);},
        (errResponse) => {
          console.log('error', errResponse);
      });
    this.http.get('http://project.usagi.pl/comment/byGallery/'+ this.galleryId, this.httpOptions).toPromise().then((response) => {
      this.comments = response;
    });
  }

  onClick(photo) {
    this.photo = photo;
  }

  removeComment(commentId){
    const index = this.comments.findIndex((comment: IComment) => comment.commentId === commentId);
    console.log("delete",commentId);
    this.http.post('http://project.usagi.pl/comment/delete/' + commentId, {}, this.httpOptions).toPromise().then((response) => {
      this.comments.splice(index, 1);
      console.log('success', response);},
      (errResponse) => {console.log('error', errResponse);
    });
  }

  NewComment(commentId) {
    this.comments.push(commentId);
  }

  saveGallery(event) {
    this.http.post('http://project.usagi.pl/gallery/' + this.galleryId, event,
      this.httpOptions).toPromise().then((response: IGallery) => {
      this.gallery = response; });
  }

}
