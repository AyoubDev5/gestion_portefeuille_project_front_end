import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogTacheComponent } from './dialog-tache/dialog-tache.component';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  public taches: any[] =[];
  public idemp: any;
  public idpro: any;
  public idteam : any;

  displayedColumns: string[] = ['name', 'isActive','created_at','actions'];
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
    this.idteam=localStorage.getItem('id_team');
    this.router.params.subscribe((params) => {
      this.idemp = params['id'];
      let idempl = String(this.idemp);
      localStorage.setItem('idemp',idempl);
      //console.log("params",this.idemp);
      this.getTaches(this.idpro,this.idteam,this.idemp);
    })
  }

  getTaches(idp: number,idt:number, idemp:number) {
    this.service.getTacheByIdEmp(idp,idt,idemp).subscribe({
      next:(res)=>{
        //console.log(res);
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
    })
  }

  editTache(row : any){
    this.dialog.open(DialogTacheComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getTaches(this.idpro,this.idteam,this.idemp);
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
