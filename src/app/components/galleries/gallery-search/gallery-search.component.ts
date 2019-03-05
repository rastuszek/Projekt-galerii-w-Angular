import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {IGallery} from "../../../interfaces/IGallery";

@Component({
  selector: 'app-gallery-search',
  templateUrl: './gallery-search.component.html',
  styleUrls: ['./gallery-search.component.scss']
})

export class GallerySearchComponent implements OnInit {

  @Output()
  searchValue: EventEmitter<String> = new EventEmitter<String>();

  value: string;

  @Input()
  galleries: IGallery[];

  constructor() { }

  ngOnInit() {
    this.value = '';
  }

  onChange() {
    this.searchValue.emit(this.value);
    console.log(this.value);
  }

}
