import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
//import material tools:\
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './auth.guard';
import { ProjectComponent } from './components/project/project.component';
import { DialogComponent } from './components/home/dialog/dialog.component';
import { DialogprojectComponent } from './components/project/dialogproject/dialogproject.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { DialogNewTeamComponent } from './components/project/dialogproject/dialog-new-team/dialog-new-team.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TeamsEmpComponent } from './components/project-details/teams-emp/teams-emp.component';
import { MaterialsComponent } from './components/project-details/materials/materials.component';
import { DialogMaterialComponent } from './components/project-details/materials/dialog-material/dialog-material.component';
import { DialogTeamEmpComponent } from './components/project-details/teams-emp/dialog-team-emp/dialog-team-emp.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { CardsComponent } from './components/project-details/cards/cards.component';
import { ChartsComponent } from './components/project-details/charts/charts.component';
import { TachesComponent } from './components/project-details/taches/taches.component';
import { DialogTacheComponent } from './components/project-details/taches/dialog-tache/dialog-tache.component';
import { DialogEmailComponent } from './components/project-details/teams-emp/dialog-email/dialog-email.component';
import { SidebarComponent } from './components/project-details/sidebar/sidebar.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';


@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent, 
    LoginComponent, 
    HomeComponent, 
    ProjectComponent, 
    DialogComponent, 
    DialogprojectComponent, 
    DialogNewTeamComponent, 
    ProjectDetailsComponent, 
    TeamsEmpComponent, 
    MaterialsComponent, 
    DialogMaterialComponent, 
    DialogTeamEmpComponent, 
    CardsComponent, 
    ChartsComponent, 
    TachesComponent, 
    DialogTacheComponent, 
    DialogEmailComponent, 
    SidebarComponent, 
    DepartmentDetailsComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
