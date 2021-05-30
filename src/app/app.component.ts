import { Component, OnInit } from '@angular/core';

import { PostModel } from './models/post.model';
import { PostService } from './services/post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  postList: PostModel[] = [];

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe( posts => {
      for (let key of Object.keys(posts)) {
        console.log(posts[key]);
        this.postList.push({
          id: posts[key].id,
          title: posts[key].title
        });
      }
    });
  }

  addNewPost(newPost: any) {
    this.postList.push(newPost);
  }
}
