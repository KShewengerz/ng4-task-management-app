import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";


@Injectable()
export class UserImageHeaderService {
  
  url: string;
  
  constructor(private http: Http,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/user`;
  }
  
  logOut(): Observable<any> {
    return this.http
    .get(`${this.url}/logout`)
    .map(response => response)
    .catch(err => Observable.throw(err));
  }
}
