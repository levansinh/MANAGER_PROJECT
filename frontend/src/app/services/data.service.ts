import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  profile:any
  URL: string = 'http://localhost:5000';
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getProfile().subscribe(data=>{
      this.profile = data.profile
    })
  }
  getProfile(): Observable<any> {
    return this.httpClient.get(`${this.URL}/user/profile`, {
      withCredentials: true,
    });
  }
}
