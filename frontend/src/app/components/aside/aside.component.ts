import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  faHome,
  faBagShopping,
  faListCheck,
  faGear,
  faRightToBracket,
  faCircleInfo,
  faUser,
  faFaceSmile,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  constructor(private router: Router,private toastr:ToastrService) {}
  token: any = localStorage.getItem('token');
  iconLogout: any = faRightToBracket;
  iconSearch:any = faSearch
  location:string = this.router.url
  login: any = {
    name: `${this.token ? 'Logout' : 'Login'}`,
    path: `${this.token ? '' : '/login'}`,
    icon: faRightToBracket,
  };
  sidebar: any = [
    [
      { name: 'Home', path: '/', icon: faHome },
      { name: 'Project', path: '/project', icon: faBagShopping },
      { name: 'Task', path: '/task', icon: faListCheck },
      { name: 'User', path: '/user', icon: faUser },
    ],
    [
      { name: 'Help', path: '/', icon: faCircleInfo },
      { name: 'Setting', path: '/', icon: faGear },

      {
        name: 'Information',
        path: `${this.token ? '/infomation' : '/'}`,
        icon: faFaceSmile,
      },
    ],
  ];
  handleLogout() {
    localStorage.clear();
    this.toastr.success("You Logged Out successfully")
    this.router.navigate(['/login']);

  }
}
