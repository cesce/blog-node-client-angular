import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { PostRequestModel, PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl = 'http://localhost:4000/posts';

  constructor(private http: HttpClient) { }

  createPost(postObject: PostRequestModel): Observable<PostRequestModel> {
    return this.http.post<PostRequestModel>(this.postsUrl, postObject);
  }

  getAllPosts() {
    return this.http.get<any>(this.postsUrl);
  }
}
