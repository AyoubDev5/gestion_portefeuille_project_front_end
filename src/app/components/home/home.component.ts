import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseURL } from 'src/environments/environment';
import { Emitters } from '../../emitters/emitters';
import { IDepartments } from './IDepartments';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


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
    private dialog:MatDialog
  ) { }


  ngOnInit(): void {
    this.depService.getDep().subscribe(deps=>{
      this.deps=deps;
    });

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

}
