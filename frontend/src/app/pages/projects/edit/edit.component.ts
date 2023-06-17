import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  leader: any = [];
  data: any = {};
  submitForm = new FormGroup({
    nameProject: new FormControl(''),
    teamSize: new FormControl(''),
    nameLeader: new FormControl(''),
    budget: new FormControl(''),
    expense: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private router: ActivatedRoute,
    private route: Router,
    private toastr:ToastrService
  ) {}
  id = this.router.snapshot.params['id'];
  ngOnInit(): void {
    this.projectService.getOneProject(this.id).subscribe((data) => {
      this.data = data.data;
    });
    this.userService.getWithRole(1).subscribe((data) => {
      this.leader = data.data;
    });
  }
  onSubmit() {
    const nameProject = this.submitForm.controls.nameProject.value;
    const teamSize = this.submitForm.controls.teamSize.value;
    const nameLeader = this.submitForm.controls.nameLeader.value;
    const expense = this.submitForm.controls.expense.value;
    const budget = this.submitForm.controls.budget.value;
    const newData:any = {
      name_leader: nameLeader,
      name_project: nameProject,
      team_size: teamSize,
      budget: budget,
      expense: expense,
    };

    this.projectService.updateProject(this.id, newData).subscribe((data) => {
      this.route.navigate(['/project']);
      this.toastr.success('Project updated successfully')
    });
  }
}
