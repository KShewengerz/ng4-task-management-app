import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


@Injectable()
export class LandingService {
  
  url: string;
  
  constructor(private http: Http,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/user`;
  }
  
  login(credentials: any): Observable<any> {
    return this.http
    .post(`${this.url}/login`, credentials)
    .map(response => response.json());
  }

}

