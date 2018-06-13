import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";


@Injectable()
export class ChangePasswordService {
  
  url: string;
  
  constructor(private http: Http,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/user`;
  }
  
  comparePassword(password: string): Observable<any> {
    return this.http
      .get(`${this.url}/compare-password/${password}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  changePassword(body: any): Observable<any> {
    return this.http
      .put(`${this.url}/change-password`, body)
      .map(response => response)
      .catch(err => Observable.throw(err));
  }
  
}
