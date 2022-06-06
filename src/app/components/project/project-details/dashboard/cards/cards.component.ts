import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public emps: any[] =[];
  public mats: any[] =[];
  public idp: any;
  public iddep;
  public idt: any;
  public countEmp: any;
  public TotalCost: any;
  public countTache : any;

  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.idp = localStorage.getItem('idpro');
    this.iddep = localStorage.getItem('id_dep');

    this.service.getMaterialByProjId(this.idp).subscribe(mats=>{
      this.mats=mats;
    })

    this.getCountTotalTache(this.idp);
    this.getTotalEmp(this.idp);
  }

    getTotal(){
      this.TotalCost = 0;
      for(let i = 0; i < this.mats.length; i++){
        let material = this.mats[i];
        this.TotalCost += (material.prix * material.quantity);
      }
      return this.TotalCost;
    }

    getTotalEmp(id){
      this.service.getCountEmp(id)
        .subscribe({
          next:(res)=>{
            this.countEmp=res
          },
          error:(err)=>{console.log('err', err);}
        })
    }

    getCountTotalTache(id){
      this.service.getCountTache(id)
      .subscribe({
        next:(res)=>{
          this.countTache=res
        },
        error:(err)=>{console.log('err', err);
        }
    });
  }
}
