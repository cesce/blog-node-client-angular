import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../services/post.service';
import { PostModel } from '../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

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
    let newPost: PostModel = this.validateForm.value;
    this.postService.createPost(newPost).subscribe(data => {
      console.log(data);
      if(typeof(data.title) === "string") {
        this.validateForm.reset('');
      }
    });
  }
}
