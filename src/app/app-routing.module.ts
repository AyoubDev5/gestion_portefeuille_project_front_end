import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TachesComponent } from './components/project-details/taches/taches.component';
import { TeamsEmpComponent } from './components/project-details/teams-emp/teams-emp.component';
import { MaterialsComponent } from './components/project-details/materials/materials.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'departments', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/projects', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/details', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
  { path: 'project/:id/team/:id/employee/:id/tache', component: TachesComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/details/employees', component: TeamsEmpComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/details/materials', component: MaterialsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
