import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Task } from "../../../../../../shared/interfaces/-index";


@Injectable()
export class TaskService {
  
  url: string;
  
  constructor(private http: Http,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/task`;
  }

  saveNewTask(body: any): Observable<any> {
    return this.http
      .post(this.url, body)
      .map(response => response.json());
  }
  
  updateTask(id: string, description: string): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, { description })
      .map(response => response);
  }
  
  fetchAllTasksByProjectId(id: string): Observable<Task[]> {
    return this.http
      .get(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  completeTask(id: string): Observable<any> {
    return this.http
      .put(`${this.url}/complete/${id}`, {})
      .map(response => response)
      .catch(err => Observable.throw(err));
  }

}