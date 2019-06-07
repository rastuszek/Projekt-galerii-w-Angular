import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from '../../../interfaces/IComment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: IComment;
  @Output() deleteComment: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  removeComment() {
    this.deleteComment.emit(this.comment.commentId);
  }

}
