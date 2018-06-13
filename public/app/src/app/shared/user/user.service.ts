import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { User } from "../../../../../../shared/interfaces/-index";


@Injectable()
export class UserService {
  
  url: string;
  
  constructor(private http: Http,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/user`;
  }
  
  saveNewUser(body: User): Observable<any> {
    return this.http
      .post(this.url, body)
      .map(response => response);
  }
  
  updateUser(body: User): Observable<any> {
    return this.http
      .put(this.url, body)
      .map(response => response);
  }
  
  fetchAllUsers(): Observable<User[]> {
    return this.http
      .get(this.url)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  fetchUser(id: string): Observable<User> {
    return this.http
      .get(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
}

