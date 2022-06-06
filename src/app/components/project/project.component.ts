import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseURL } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IProjects } from './IProjects';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectComponent } from './dialog-project/dialog-project.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects: any[] =[];
  public id: number;
  row;
  displayedColumns: string[] = ['title', 'start_date', 'end_date','created_at', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor( 
  private http: HttpClient,
  private route: ActivatedRoute,
  private service: AuthService,
  private dialog:MatDialog,
  private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      //console.log("params",this.id);
      let idd = String(this.id);
      localStorage.setItem("id_dep", idd)
      this.GetAllProjects(this.id);
    })

    // this.service.getProjects().subscribe(projects=>{
    //   this.projects=projects;
    // });
  }


  openDialog(row : any) {
    this.dialog.open(DialogProjectComponent, {
      width:"40%" ,
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.GetAllProjects(this.id);
      }
    })
  }

  GetAllProjects(id) {
    this.service.getProjectsByDepId(id)
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoadingResults = false;
        this.isRateLimitReached = res === null;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{console.log('err', err);
      }
    });
  }

  editProject(row : any){
    this.dialog.open(DialogProjectComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.GetAllProjects(this.id);
      }
    })
  }

  deleteProject(id:number){
    this.service.deleteProject(id)
    .subscribe({
      next:(res)=>{
        alert('product deleted');
        this.GetAllProjects(this.id);
      },
      error:(err)=>{
        alert('Error')
        console.log("err", err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detailsNav(){
    this.redirect();
  }

  private redirect(): void {
    // this.router.navigate([`/department/${this.id}/project/${row.id}`]);
  }

}
