import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditMemberComponent implements OnInit {
  data: any = [];
  id = this.router.snapshot.params['id'];
  submitForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    address: new FormControl('',[Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UserService,
    private toastr :ToastrService,
    private router:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.userService.getWithRole(1).subscribe((data) => {
      console.log(data.data);
      this.data = data.data;
      console.log(this.id);
    });
  }
  onSubmit() {
    const username = this.submitForm.controls.username.value;
    const password = this.submitForm.controls.password.value;
    const email = this.submitForm.controls.email.value;
    const phone = this.submitForm.controls.phone.value;
    const address = this.submitForm.controls.address.value;
    const newData = {
      username: username,
      password: password,
      email: email,
      phone: phone,
      address: address,
    };

    this.authService.update(this.id,newData).subscribe((data) => {
      this.route.navigate(['/user']);
      this.toastr.success(`User added successfully`)
    });
  }
}
