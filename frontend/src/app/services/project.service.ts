import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from '../common/project';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  URL: string = 'http://localhost:5000/project';
  constructor(private httpClient: HttpClient) {}

  getAllProject():Observable<any>{
    return this.httpClient.get(`${this.URL}`,{ withCredentials: true });
  }
  getOneProject(id:any):Observable<any>{
    return this.httpClient.get(`${this.URL}/${id}`,{ withCredentials: true });
  }
  addProject(data: Project):Observable<any> {
    return this.httpClient.post(this.URL, data,{ withCredentials: true });
  }
  updateProject(id:any,data: Project):Observable<any> {
    let API_URL = `${this.URL}/edit/${id}`;
    return this.httpClient.put(API_URL, data,{ withCredentials: true });
  }
  deleteProject(id:any):Observable<any> {
    let API_URL = `${this.URL}/${id}`;
    return this.httpClient.delete(API_URL,{ withCredentials: true });
  }

}
