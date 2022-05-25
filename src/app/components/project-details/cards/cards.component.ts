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
  public idt: any;
  public lengthOfEmp: any;
  public TotalCost: any;
  public countTache : any;

  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.idp = localStorage.getItem('id_pro');
    this.idt = localStorage.getItem('id_team');
    this.service.getEmployByTeamId_TeamByProjId(this.idp, this.idt).subscribe(emps=>{
      this.emps=emps;
      this.lengthOfEmp = this.emps.length;
    });

    this.service.getMaterialByProjId(this.idp).subscribe(mats=>{
      this.mats=mats;
    })
    
    this.getCountTotalTache(this.idp);
  }

    getTotal(){
      this.TotalCost = 0;
      for(let i = 0; i < this.mats.length; i++){
        let material = this.mats[i];
        this.TotalCost += (material.prix * material.quantity);
      }
      return this.TotalCost;
    }

    getCountTotalTache(id){
    this.service.getCountTache(id)
    .subscribe({
      next:(res)=>{
        this.countTache=res
        // console.log("count tache:",this.countTache);
      },
      error:(err)=>{console.log('err', err);
      }
    });
  }
}