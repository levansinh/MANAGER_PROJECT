import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
// import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/services/user.service';
import {
  faUser,
  faHeart,
  faEnvelope,
  faStar,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.css'],
})
export class InfomationComponent implements OnInit {
  iconUser: any = faUser;
  iconHeart: any = faHeart;
  iconEnvelope: any = faEnvelope;
  iconPlus: any = faPlus;
  iconStar: any = faStar;
  file: any;
  user: any;
  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {
    console.log(this.user);
  }
  ngOnInit(): void {
    this.user = this.dataService.getProfile().subscribe(data=>{this.user = data.profile});
  }
  handleGetFile(event: any) {
    this.file = event.target.files[0].name;
  }
  handleSubmit() {
    const formData = new FormData();
    formData.append('image', this.file);
    this.userService
      .updateImageUser(this.user._id, formData)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
