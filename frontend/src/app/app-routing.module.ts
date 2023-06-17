import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateComponent } from './pages/projects/create/create.component';
import { EditComponent } from './pages/projects/edit/edit.component';

import { ListTaskComponent } from './pages/tasks/list-task/list-task.component';
import { CreateTaskComponent } from './pages/tasks/create-task/create-task.component';
import { EditTaskComponent } from './pages/tasks/edit-task/edit-task.component';

import { MemberComponent } from './pages/members/member/member.component';
import { CreateMemberComponent } from './pages/members/create/create.component';
import { EditMemberComponent } from './pages/members/edit/edit.component';

import { InfomationComponent } from './pages/infomation/infomation.component';

import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'project',

        children: [
          {
            path: '',
            component: ProjectComponent,
          },
          {
            path: 'create',
            canActivate: [RoleGuard],
            data: {
              role: 1,
            },
            component: CreateComponent,
          },
          {
            path: 'edit/:id',
            canActivate: [RoleGuard],
            data: {
              role: 1,
            },
            component: EditComponent,
          },
        ],
      },
      {
        path: 'task',
        children: [
          { path: '', component: ListTaskComponent },
          {
            path: 'create',
            component: CreateTaskComponent,
          },
          {
            path: 'edit/:id',
            component: EditTaskComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          { path: '', component: MemberComponent },
          {
            path: 'create',
            component: CreateMemberComponent,
            canActivate: [RoleGuard],
            data: {
              role: 1,
            },
          },
          {
            path: 'edit/:id',
            component: EditMemberComponent,
            canActivate: [RoleGuard],
            data: {
              role: 1,
            },
          },
        ],
      },
      {
        path: 'infomation',
        component: InfomationComponent,
      },
      { path: 'changePassword', component: ChangePasswordComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
