import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from '../../../interfaces/IComment';
import {HttpClient, HttpHeaders,} from '@angular/common/http';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Output() addComment: EventEmitter<IComment> = new EventEmitter<IComment>();

  comment: IComment;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '52'
    })
  };

  @Input() galleryId:string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.comment = this.setEmptyComment();
  }

  onSubmit () {
    this.http.post('http://project.usagi.pl/comment',
      this.comment, this.httpOptions).toPromise().then((response: IComment) => { console.log(response);
      this.comment= this.setEmptyComment();
      this.addComment.emit(response);
  });
}

 private setEmptyComment() {
    const newDate = new Date();

    return {
      galleryId: this.galleryId,
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      dateCreated: newDate
    };
  }
}

