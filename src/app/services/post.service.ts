import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl = 'http://localhost:4000/posts';

  constructor(private http: HttpClient) { }

  createPost(postObject: any) {
    this.http.post(this.postsUrl, postObject).subscribe( data => console.log(data));
  }
}
