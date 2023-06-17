import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

import {
  faCirclePlus,
  faTrash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  plusIcon = faCirclePlus;
  faTrash = faTrash;
  faEdit = faPenToSquare;
  data: any = [];
  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.projectService.getAllProject().subscribe((data) => {
      this.data = data.data;
    });
  }
  handleDelete(id: string) {
    this.projectService.deleteProject(id).subscribe((data) => {
      if (confirm('???')) {
        this.ngOnInit();
        this.toastr.success('You have deleted Successfully');
      }
    });
  }
  convertToDay(dateString: string) {
    const date = new Date(dateString);
    const options: any = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
