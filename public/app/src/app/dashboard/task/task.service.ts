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
  
  updateTasksOrdinal(body: Task[]): Observable<any> {
    return this.http
      .put(this.url, body)
      .map(response => response);
  }

  updateTask(id: string, description: string): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, { description })
      .map(response => response);
  }
  
  fetchAllTasksByProjectStatusId(id: string, status: string): Observable<Task[]> {
    return this.http
      .get(`${this.url}/${status}/${id}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  completeTask(id: string): Observable<any> {
    return this.http
      .put(`${this.url}/complete/${id}`, {})
      .map(response => response)
      .catch(err => Observable.throw(err));
  }
  
  rescheduleTask(body: any): Observable<any> {
    return this.http
      .put(`${this.url}/reschedule`, body)
      .map(response => response)
      .catch(err => Observable.throw(err));
  }

}
