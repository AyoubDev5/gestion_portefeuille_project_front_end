import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseURL } from 'src/environments/environment';
import { IDepartments } from './IDepartments';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public deps: any[] =[];

  constructor(
    private http: HttpClient,
    private depService: AuthService,
    private dialog:MatDialog,
    private cookies: CookieService,
  ) { }


  ngOnInit(): void {
    this.depService.getDep().subscribe(deps=>{
      this.deps=deps;
    });
    this.changeActivity();
    // let token = localStorage.getItem('jwt');
    let token = this.cookies.get('token');
    console.log("token",token);
    
    // this.depService.userInfo().subscribe(res => {
    //   console.log('res',res)
    // })
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
