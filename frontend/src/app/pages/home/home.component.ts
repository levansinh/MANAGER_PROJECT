import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from 'src/app/services/data.service';
import { faUser, faList, faBagShopping, faTag } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faTag:any = faTag
  faList:any = faList
  faUser:any = faUser
  faBagShopping:any = faBagShopping
  lengthUser:any = ''
  lengthProject:any = ''
  lengthTask:any = ''
  totalPrice:any = ''
  constructor(private data: DataService,private userService:UserService,private taskService:ProjectService,private projectService:ProjectService) {}
  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data=>{
      console.log(data.length);
      this.lengthUser =data.length
    })
    this.taskService.getAllProject().subscribe(data=>{
      
      this.lengthProject =data.data.length
      this.totalPrice =data.data.map((item:any):any=>item.budget).reduce((curr:any, sum:any )=> curr +sum)
    })
    this.projectService.getAllProject().subscribe(data=>{
      console.log(data.data.length);
      this.lengthTask =data.data.length
    })
  }
}
