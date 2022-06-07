import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogTacheComponent } from './dialog-tache/dialog-tache.component';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {

  public taches: any[] =[];
  public idemp: any;
  public idpro: any;

  displayedColumns: string[] = ['name','start_date','end_date', 'statut','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource!: MatTableDataSource<any>;
  constructor(
    private router: ActivatedRoute,
    private service: AuthService,
    private dialog:MatDialog,
  ) { }


  ngOnInit(): void {
    this.idpro=localStorage.getItem('id_pro');
    this.router.params.subscribe((params) => {
      this.idpro = params['id'];
      let idpro = String(this.idpro);
      localStorage.setItem('idpro',idpro);
      //console.log("params",this.idpro);
      this.getTaches(this.idpro);
    })
  }

  getTaches(idp: number) {
    this.service.getTacheByIdProjet(idp).subscribe({
      next:(res)=>{
        this.taches = res;
        //console.log("getTaches",this.taches);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{console.log('err', err);
      }
    });
  }

  openDialogTache() {
    this.dialog.open(DialogTacheComponent, {
      width:"40%" ,
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getTaches(this.idpro);
      }
    })
  }

  editTache(row : any){
    this.dialog.open(DialogTacheComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getTaches(this.idpro);
      }
    })
  }

  deleteTache(id:number){
    this.service.deleteTache(id)
    .subscribe({
      next:(res)=>{
        alert('tache deleted');
        this.getTaches(this.idpro);
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

}