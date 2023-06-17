import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
export interface CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, OnInit {
  dataUser: any = {};
  constructor(
    private authService: AuthService,
    public dataService: DataService,
    private router: Router,
    private toarst: ToastrService
  ) {}
  ngOnInit(): void {
    this.dataService.getProfile().subscribe((data) => {
      this.dataUser = data.profile;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const role = route.data['role'];
    this.dataService.getProfile().subscribe((data) => {
      this.dataUser = data.profile;
    });

    if (!this.authService.isAuthenticated() || this.dataUser?.role !== role) {
      this.router.navigate([this.router.url]);
      this.toarst.warning('You do not have permission to access this page');
      return false;
    }
    return true;
  }
}
