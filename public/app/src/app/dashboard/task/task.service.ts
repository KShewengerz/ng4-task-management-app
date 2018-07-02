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

  saveNewTask(body: Task): Observable<any> {
    return this.http
      .post(this.url, body)
      .map(response => response);
  }
  
  updateTask(body: Task): Observable<any> {
    return this.http
      .put(this.url, body)
      .map(response => response);
  }
  
  fetchAllTasks(): Observable<Task[]> {
    return this.http
      .get(this.url)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  fetchTask(id: string): Observable<Task> {
    return this.http
      .get(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }

}