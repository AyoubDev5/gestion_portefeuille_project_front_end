import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {DialogEmployeeComponent} from "./dialog-employee/dialog-employee.component"
import {SendSmsComponent} from "./send-sms/send-sms.component"

export interface DialogData {
  email: string;
  message: string;
  nom: string;
  subject: string;
};

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public empls:any[]=[];
  public idprojet: any;


  displayedColumns: string[] = ['nom', 'prenom', 'specialite','email','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource!: MatTableDataSource<any>;
  constructor(
    private route: ActivatedRoute,
    private service: AuthService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
      this.idprojet = localStorage.getItem('idpro');
        this.GetAllEmpls(this.idprojet)
  }

  openDialogEmpl() {
    this.dialog.open(DialogEmployeeComponent, {
      width:"40%" ,
    })
  }

  openDialog(row : any): void {
    const dialogRef = this.dialog.open(SendSmsComponent, {
      width: '500px',
      data:row
     });
    }

  GetAllEmpls(idp) {
    this.service.getEmployByTeamId_TeamByProjId(idp)
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

  editEmp(row : any){
    this.dialog.open(DialogEmployeeComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.GetAllEmpls(this.idprojet);
      }
    })
  }
  deleteEmp(id:number){
    this.service.deleteEmpl(id)
    .subscribe({
      next:(res)=>{
        this.GetAllEmpls(this.idprojet);
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
  }

  // openDialog(row : any): void {
  //   const dialogRef = this.dialog.open(DialogEmailComponent, {
  //     width: '500px',
  //     data:row
  //     //data: {nom: this.nom, email: this.email, message: this.message, subject:this.subject},
  //    });

  }
