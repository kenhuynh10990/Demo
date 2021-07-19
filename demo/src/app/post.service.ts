import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './model/post.model';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }
  
  addNewPost(id:number,post:Post):Observable<any>{
      return this.httpClient.post('https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user/'+id+'/post',post)
  }
}
