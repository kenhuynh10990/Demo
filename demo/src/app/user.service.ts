import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/';

  constructor(private httpClient: HttpClient) { }

  public getUserById(id): Observable<any> {
    return this.httpClient.get('https://60ee6509eb4c0a0017bf43f1.mockapi.io/api/user/' + id);
  }
}
