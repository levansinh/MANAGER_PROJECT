import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { DataService } from 'src/app/services/data.service';
import { Project } from '../../../common/project';
@Component({
  selector: 'app-edit',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  leader: any = [];
  project: any;
  profile:any
  submitForm = new FormGroup({
    nameTask: new FormControl(''),
    description: new FormControl(''),
    nameProject: new FormControl(''),
    priority: new FormControl(''),
    assignedTo: new FormControl(''),
    hoding: new FormControl(''),
  });
  constructor(
    private taskService: TaskService,
    private route: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private dataService: DataService,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.dataService.getProfile().subscribe((data) => {
      this.profile = data.profile;
      console.log(this.profile);
    });
    this.userService.getAllUser().subscribe((data) => {
      this.leader = data;
    });
    this.projectService.getAllProject().subscribe((data) => {
      this.project = data.data;
    });
    
  }
  onSubmit() {
    const nameTask = this.submitForm.controls.nameTask.value;
    const description = this.submitForm.controls.description.value;
    const nameProject = this.submitForm.controls.nameProject.value;
    const priority = this.submitForm.controls.priority.value;
    const assignedTo = this.submitForm.controls.assignedTo.value;
    const hoding = this.submitForm.controls.hoding.value;
    const newData = {
      project_name: nameProject,
      task_name: nameTask,
      description: description,
      assigned_to: assignedTo,
      priority: priority,
      status: hoding,
    };

    this.taskService
      .addTask({
        ...newData,
        assigned_to: assignedTo ? assignedTo : this.profile._id,
      })
      .subscribe((data) => {
        this.route.navigate(['/task']);
        this.toastr.success(`Project added successfully`);
      });
  }
}
