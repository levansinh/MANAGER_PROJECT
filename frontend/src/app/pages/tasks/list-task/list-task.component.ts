import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { DataService } from 'src/app/services/data.service';
import {
  faCirclePlus,
  faTrash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tasks',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent {
  plusIcon = faCirclePlus;
  faTrash = faTrash;
  faEdit = faPenToSquare;
  data: any = [];
  task: any;
  constructor(
    private tasksService: TaskService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.dataService.getProfile().subscribe((data) => {
      this.data = data.profile;
    });
    this.tasksService.getAllTask().subscribe((data) => {
      const allTask = data.data;
      this.task = allTask;
      this.task =
        this.data?.role === 1
          ? allTask
          : allTask.filter((task: any) => task.assigned_to === this.data?._id);
    });
  }
  handleDelete(id: string) {
    if (confirm('Bạn có muốn xóa ???')) {
      this.tasksService.deleteTask(id).subscribe((data) => {
        this.ngOnInit();
        this.toastr.success('You have deleted successfully');
      });
    }
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
