import { Component, OnInit, Input } from '@angular/core';

import { PostModel } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() postList: PostModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
