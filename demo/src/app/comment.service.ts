import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  createComment(userId:number,postId:number,comment:Comment):Observable<any>{
      return this.http.post<any>('https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user/'+userId+'/post/'+postId+'/comment',comment);
  }
  getComment(userId:number,postId:number):Observable<any>{
      return this.http.get('https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user/'+userId+'/post/'+postId+'/comment')
  }
}
