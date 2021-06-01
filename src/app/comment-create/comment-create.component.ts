import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CommentModel } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  @Input() postId: String = '';
  commentsList: CommentModel[] = [];
  validateCommentForm!: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPostComments(this.postId).subscribe( comments => {
      this.commentsList = comments;
    });

    this.validateCommentForm = this.fb.group({
      content: new FormControl()
    });
  }

  submitForm(): void {
    for (const i in this.validateCommentForm.controls) {
      this.validateCommentForm.controls[i].markAsDirty();
      this.validateCommentForm.controls[i].updateValueAndValidity();
    }
    const comment: CommentModel = this.validateCommentForm.value;
    this.postService.createComment(this.postId, comment).subscribe( (comments: CommentModel[]) => {
      console.log(comments);
      this.commentsList = comments;
      this.validateCommentForm.reset('');
    });
  }
}
