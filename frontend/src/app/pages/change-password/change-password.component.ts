import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  responseData: any = [];
  submitForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private toasrt: ToastrService
  ) {}

  onSubmit() {
    const oldPassword = this.submitForm.controls.oldPassword.value;
    const newPassword = this.submitForm.controls.newPassword.value;
    const newData = { old_password: oldPassword, password: newPassword };
    const local: any = localStorage.getItem('userCurrent');
    const user: any = JSON.parse(local);
    this.userService
      .updateUser(user._id, newData)
      .subscribe((data: any): void => {
        console.log(data);
        if (data != null) {
          this.router.navigate(['/infomation']);
          this.toasrt.success('Change success');
        }
      });
  }
  ngOnInit(): void {}
}
