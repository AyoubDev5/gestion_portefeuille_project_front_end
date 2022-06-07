import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogMaterialComponent } from './dialog-material/dialog-material.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  public materials: any[] =[];
  public idprojet: any;

  displayedColumns: string[] = ['name', 'prix', 'quantity', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    private service: AuthService, 
    private router: ActivatedRoute, 
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
      this.idprojet = localStorage.getItem('idpro')
      //console.log("params",this.idprojet);
      this.getMaterials(this.idprojet);
  }

  getMaterials(id_pro: number) {
    this.service.getMaterialByProjId(id_pro).subscribe({
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
  openDialog(){
    this.dialog.open(DialogMaterialComponent, {
      width:"40%" ,
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getMaterials(this.idprojet);
      }
    })
  }


  editMaterial(row : any){
    this.dialog.open(DialogMaterialComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getMaterials(this.idprojet);
      }
    })
  }

  deleteMaterial(id:number){
    this.service.deleteMaterial(id)
    .subscribe({
      next:(res)=>{
        alert('product deleted');
        this.getMaterials(this.idprojet);
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


}
