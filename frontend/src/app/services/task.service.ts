import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../common/task';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  URL: string = 'http://localhost:5000/task';
  constructor(private httpClient: HttpClient) {}
  getAllTask(): Observable<any> {
    return this.httpClient.get(`${this.URL}`, { withCredentials: true });
  }
  getOneTask(id: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/edit/${id}`, {
      withCredentials: true,
    });
  }
  addTask(data: Task): Observable<any> {
    return this.httpClient.post(this.URL, data, { withCredentials: true });
  }
  updateTask(id: any, data: Task): Observable<any> {
    let API_URL = `${this.URL}/edit/${id}`;
    return this.httpClient.put(API_URL, data, { withCredentials: true });
  }
  deleteTask(id: any): Observable<any> {
    let API_URL = `${this.URL}/${id}`;
    return this.httpClient.delete(API_URL, { withCredentials: true });
  }
}
