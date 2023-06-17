import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from 'src/app/services/data.service';
import { TaskService } from 'src/app/services/task.service';
import {
  faUser,
  faList,
  faBagShopping,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from 'src/app/services/project.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/common/project';
// import { Project } from 'src/app/common/project';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  projects!: Project[];
  project!: Project;
  data!: any;
  totalPrice: any = 0;
  teamSize!: number;
  tasksInProgress!: any;
  userCount!: number;
  constructor(
    private dataSerice: DataService,
    private userService: UserService,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}
  submitForm = new FormGroup({
    nameProject: new FormControl(''),
  });
  ngOnInit(): void {
    this.projectService.getAllProject().subscribe((data) => {
      this.projects = data.data;
      this.totalPrice = this.projects.reduce(
        (total, curr) => total + curr.budget,
        0
      );
      console.log(this.totalPrice);
    });
    this.userService.getAllUser().subscribe((data) => {
      this.userCount = data.length;
    });
    this.taskService.getAllTask().subscribe((data) => {
       const totalTask= data.data.filter(
        (task: any) => task.status === 'hoding'
      );
      this.tasksInProgress =totalTask.length;
    });
  }
  handleOnChange() {
    this.projectService
      .getOneProject(this.submitForm.controls.nameProject.value)
      .subscribe((data) => {
        this.project = data.data;
        console.log(data.data);
      });
  }
}
