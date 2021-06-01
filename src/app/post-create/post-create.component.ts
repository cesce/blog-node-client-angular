import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../services/post.service';
import { PostRequestModel, PostModel } from '../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  @Output() newPostEvent = new EventEmitter<PostModel>();
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: new FormControl()
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    let newPost: PostRequestModel = this.validateForm.value;
    this.postService.createPost(newPost).subscribe((data: PostRequestModel) => {
      console.log(data);
      if(typeof(data.title) === "string") {
        const id: String = data.id || '';
        const newPost: PostModel = {
          id: id,
          title: data.title
        };
        console.log(`newPost: ${JSON.stringify(newPost)}`);
        this.newPostEvent.emit(newPost);
        this.validateForm.reset('');
      }
    });
  }
}
