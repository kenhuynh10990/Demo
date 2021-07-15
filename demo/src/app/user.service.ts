import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/';

  constructor(private httpClient: HttpClient) { }
public getAllUser():Observable<any>{
    return this.httpClient.get('https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user');
}
  public register(user:User){
      return this.httpClient.post('https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user',user);
  }
 
}
