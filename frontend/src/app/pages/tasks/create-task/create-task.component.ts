import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-create',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  leader: any = [];
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
    private toastr :ToastrService,
    private projectService:ProjectService
  ) {}
  ngOnInit(): void {
    this.userService.getWithRole(1).subscribe((data) => {
      console.log(data.data);
      this.leader = data.data;
    });
    this.projectService.getAllProject().subscribe(data=>{
      console.log(data);
    })
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

    this.taskService.addTask(newData).subscribe((data) => {
      this.route.navigate(['/task']);
      this.toastr.success(`Project added successfully`)
    });
  }
}
