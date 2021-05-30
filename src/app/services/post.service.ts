import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl = 'http://localhost:4000/posts';

  constructor(private http: HttpClient) { }

  createPost(postObject: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.postsUrl, postObject);
  }
}
