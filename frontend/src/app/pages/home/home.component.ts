import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.getProfile()
  }
}
