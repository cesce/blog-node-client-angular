import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { PostRequestModel, CommentModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl = 'http://localhost:4000/posts';
  commentsUrl = 'http://localhost:4001/posts';

  constructor(private http: HttpClient) { }

  createPost(postObject: PostRequestModel): Observable<PostRequestModel> {
    return this.http.post<PostRequestModel>(this.postsUrl, postObject);
  }

  getAllPosts() {
    return this.http.get<any>(this.postsUrl);
  }

  createComment(postId: String, comment: CommentModel): Observable<CommentModel[]> {
    return this.http.post<CommentModel[]>(`${this.commentsUrl}/${postId}/comments`, comment);
  }

  getAllPostComments(postId: String): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.commentsUrl}/${postId}/comments`);
  }
}
