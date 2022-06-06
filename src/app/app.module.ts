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
import { DialogComponent } from './components/home/dialog/dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';


//calendar:
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProjectComponent } from './components/project/project.component';
import { DialogProjectComponent } from './components/project/dialog-project/dialog-project.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import {CookieService} from 'ngx-cookie-service';
import { TacheComponent } from './components/project/project-details/tache/tache.component';
import { DialogTacheComponent } from './components/project/project-details/tache/dialog-tache/dialog-tache.component';
import { EmployeeComponent } from './components/project/project-details/employee/employee.component';
import { DialogEmployeeComponent } from './components/project/project-details/employee/dialog-employee/dialog-employee.component';
import { MaterialComponent } from './components/project/project-details/material/material.component';
import { DialogMaterialComponent } from './components/project/project-details/material/dialog-material/dialog-material.component';
import { DashboardComponent } from './components/project/project-details/dashboard/dashboard.component';
import { ChartsComponent } from './components/project/project-details/dashboard/charts/charts.component';
import { CardsComponent } from './components/project/project-details/dashboard/cards/cards.component';
import { SidebarComponent } from './components/project/project-details/dashboard/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SendSmsComponent } from './components/project/project-details/employee/send-sms/send-sms.component';
import { MainComponent } from './components/project/project-details/dashboard/main/main.component';
import { HeaderComponent } from './components/project/project-details/dashboard/header/header.component';
import { DashHomeComponent } from './components/project/project-details/dashboard/dash-home/dash-home.component';
// import $ from "jquery";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent, NavbarComponent, LoginComponent, HomeComponent, DialogComponent, ProjectComponent, DialogProjectComponent, ProjectDetailsComponent, TacheComponent, DialogTacheComponent, EmployeeComponent, DialogEmployeeComponent, MaterialComponent, DialogMaterialComponent, DashboardComponent, ChartsComponent, CardsComponent, SidebarComponent, SendSmsComponent, MainComponent, HeaderComponent, DashHomeComponent
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
    FullCalendarModule,
    ModalModule.forRoot(),
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    AuthGuard,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
