import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseURL } from 'src/environments/environment';
import { IDepartments } from './IDepartments';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public deps: any;
  public userInfo: any[] =[];


  constructor(
    private http: HttpClient,
    private depService: AuthService,
    private dialog:MatDialog,
    private cookies: CookieService,
    private router: Router, 
  ) { }


  ngOnInit(): void {
    //fetch user to get Id Dep
    this.http.get('http://localhost:8000/api/user', {withCredentials: true})
    .subscribe((res)=> {
      this.userInfo.push(res);
      this.userInfo.map(item=>{
        let userRole = item.role;
        if(userRole == 'admin'){
          this.depService.getDep().subscribe(deps=>{
          this.deps=deps;
          // console.log('res from admin',this.deps)
      });
        }else{
          let id_dep = item.department;
          localStorage.setItem('id_dep', id_dep);
          this.http.get(`http://localhost:8000/api/departmentByUser/${id_dep}`)
          .subscribe(res =>{
            this.deps = res;
            this.router.navigate([`/department/${id_dep}/projects`]);
          })
        }
      })
    })
    this.changeActivity();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"40%" ,
    })
    // .afterClosed().subscribe(val=>{
    //   if(val){
    //     this.depService.getDep();
    //   }
    // });
  }

  changeActivity(){
  //   this.depService.changeActivityProject()
  //   .subscribe(res=>{
  //     console.log("jjjjjj");
      
  //   }
  // )
  }

}