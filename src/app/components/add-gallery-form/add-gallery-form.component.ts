import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IGallery } from '../../interfaces/IGallery';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-add-gallery-form',
  templateUrl: './add-gallery-form.component.html',
  styleUrls: ['./add-gallery-form.component.scss']
})
export class AddGalleryFormComponent implements OnInit {

  @Output() saveGallery: EventEmitter<any> = new EventEmitter<any>();
  @Input() gallery?: IGallery;

  constructor() {}

  ngOnInit() {
    this.gallery = (this.gallery && this.gallery.galleryId) ? this.gallery : this.setEmptyGallery();
  }
  onSubmit() {
    this.saveGallery.emit(this.gallery);
  }

  setEmptyGallery() {
    return {
      title: '',
      thumbUrl: '',
      dateCreated: new Date(),
      description: '',
      tags: [],
      photos: [this.setEmptyPhoto()]
    };
  }

  setEmptyPhoto() {
    return {
      photoId: uuid(),
      thumbUrl: '',
      imgUrl: ''
    };
  }

  addPhoto() {
    this.gallery.photos.push(this.setEmptyPhoto());
  }

  removePhoto(index) {
    if (this.gallery.photos.length > 0) {
      this.gallery.photos.splice(index, 1);
    }
  }

  addTag(){
      this.gallery.tags.push({tag:''});
  }

  removeTag(id){
      this.gallery.tags.splice(id ,1);
  }

}
