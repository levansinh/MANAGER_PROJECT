import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  URL: string = 'http://localhost:5000';
  profile: any;
  constructor(private httpClient: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getProfile() {
    this.httpClient
      .get<any>(`${this.URL}/user/profile`, { withCredentials: true })
      .subscribe((data) => {
        this.profile = data.profile;
      });
  }
}
