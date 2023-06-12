import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/services/task.service';
import { faCirclePlus,faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tasks',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent {
  plusIcon=faCirclePlus
  faTrash=faTrash
  faEdit=faPenToSquare
  data:any=[]
  constructor(private tasksService: TaskService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.tasksService.getAllTask().subscribe((data) => {
      console.log(data);
      this.data = data.data;
    });
  }
  handleDelete(id: string) {
    if (confirm('Bạn có muốn xóa ???')) {
      this.tasksService.deleteTask(id).subscribe((data) => {
        this.ngOnInit();
        this.toastr.success("You have deleted successfully")
      });
    }
  }
  convertToDay(dateString:string) {
    const date = new Date(dateString);
    const options:any = {
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
