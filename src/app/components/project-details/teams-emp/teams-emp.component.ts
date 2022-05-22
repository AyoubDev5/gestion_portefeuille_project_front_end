import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogTeamEmpComponent } from './dialog-team-emp/dialog-team-emp.component';

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

  displayedColumns: string[] = ['nom', 'prenom', 'specialite','actions'];
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



}

