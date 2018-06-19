import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Project } from "../../../../../../shared/interfaces/-index";


@Injectable()
export class ProjectService {
  
  url: string;
  
  constructor(private http: Http,
              @Inject("API_URL") private apiUrl: string) {
    this.url = `${apiUrl}/project`;
  }
  
  saveNewProject(body: Project): Observable<any> {
    return this.http
      .post(this.url, body)
      .map(response => response.json());
  }
  
  updateProject(id: string, name: string): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, { name })
      .map(response => response);
  }
  
  fetchAllUserProjects(): Observable<Project[]> {
    return this.http
      .get(this.url)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  fetchProject(id: string): Observable<Project> {
    return this.http
      .get(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
  deleteProject(id: string): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(err => Observable.throw(err));
  }
  
}

