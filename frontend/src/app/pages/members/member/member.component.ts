import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { faCirclePlus,faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  plusIcon=faCirclePlus
  faTrash=faTrash
  faEdit=faPenToSquare
  data: any = [];
  constructor(private userService: UserService,private toastr:ToastrService) {
    
  }
  ngOnInit(): void {
    this.userService.getAllUser().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
  handleDelete(id: string) {
    this.userService.deleteUser(id).subscribe((data) => {
        if (confirm('Bạn có muốn xóa ???')) {
        this.ngOnInit();
        this.toastr.success('You have deleted Successfully')
      }
      });
  }

}
