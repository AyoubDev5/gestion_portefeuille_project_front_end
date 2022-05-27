import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMaterialComponent } from './dialog-material/dialog-material.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
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
      this.idprojet = localStorage.getItem('id_pro')
      //console.log("params",this.idprojet);
      this.getMaterials(this.idprojet);

  }

  getMaterials(id: number) {
    this.service.getMaterialByProjId(id).subscribe({
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
