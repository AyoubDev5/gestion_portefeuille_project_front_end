import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'departments', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/projects', component: ProjectComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}