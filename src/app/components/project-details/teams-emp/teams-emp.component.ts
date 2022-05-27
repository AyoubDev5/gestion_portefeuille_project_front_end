import { isNgTemplate } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogTeamEmpComponent } from './dialog-team-emp/dialog-team-emp.component';
import {DialogEmailComponent} from './dialog-email/dialog-email.component'

export interface DialogData {
  email: string;
  message: string;
  nom: string;
  subject: string;
};

@Component({
  selector: 'app-teams-emp',
  templateUrl: './teams-emp.component.html',
  styleUrls: ['./teams-emp.component.css']
})


export class TeamsEmpComponent implements OnInit {
  public empls:any[]=[];
  public idprojet: number;
  public idteam: number;
  public teams:any[]=[];

  email: string;
  message: string;
  nom: string;
  subject: string


  displayedColumns: string[] = ['nom', 'prenom', 'specialite','email','actions', 'tache'];
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

    this.route.params.subscribe((params) => {
      this.idprojet = params['id'];
      let idp=String(this.idprojet);
      localStorage.setItem("id_pro",idp);
      this.service.getTeamByProjetId(this.idprojet).subscribe(team=>{
        this.teams=team
        this.teams.find(tea=>{
          // console.log("ta",tea.id);
          this.idteam=tea.id;
          let idt=String(this.idteam)
          localStorage.setItem("id_team",idt)
          // console.log("t",this.idteam);
        })
        this.GetAllEmpls(this.idprojet,this.idteam)


      });
    })

  }

  openDialogEmpl() {
    this.dialog.open(DialogTeamEmpComponent, {
      width:"40%" ,
    })
  }

  GetAllEmpls(idp, idt) {
    this.service.getEmployByTeamId_TeamByProjId(idp,idt)
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
    this.dialog.open(DialogTeamEmpComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.GetAllEmpls(this.idprojet, this.idteam);
      }
    })
  }
  deleteEmp(id:number){
    this.service.deleteEmpl(id)
    .subscribe({
      next:(res)=>{
        this.GetAllEmpls(this.idprojet, this.idteam);
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

  openDialog(row : any): void {
    const dialogRef = this.dialog.open(DialogEmailComponent, {
      width: '500px',
      data:row
      //data: {nom: this.nom, email: this.email, message: this.message, subject:this.subject},
     });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.row = result;
    // });
  }

}

