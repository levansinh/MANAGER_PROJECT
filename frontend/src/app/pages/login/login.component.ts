import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  responseData: any = [];
  loginForm = new FormGroup({
    username: new FormControl('',[ Validators.required]),
    password: new FormControl('',[ Validators.minLength(5),Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private toasrt: ToastrService
  ) {}

  onSubmit() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    const newData = { username: username, password: password };

    this.authService.loginUser(newData).subscribe((data: any): void => {
      console.log(data);
      if (data != null) {
        this.responseData = data;
        localStorage.setItem('token', data.token);
        this.dataService.getProfile()
        this.router.navigate(['/']);
        this.toasrt.success('Login success', 'Success!');
      }
    });
  }
  ngOnInit(): void {}
}
