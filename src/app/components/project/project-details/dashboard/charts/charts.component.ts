import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Chart,registerables  } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public chartBar:any=[];
  public chartLine:any=[];
  public chartDounat:any=[];
  public materials: any[] =[];
  public idprojet: number;
  public nomMat: any;
  public priceMat: any;
  public Qte: any;
  public taches:any;
  public employNom:any;
  public employPrenom:any;
  public label:any;
  public tacheProject:any;
  public tacheProjectNew:any;
  public tacheProjectNewOther:any;
  public nomProject:any;
  public count:any;
  constructor(
    private service: AuthService,
    private router: ActivatedRoute,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.idprojet = params['id'];
      let iddep = localStorage.getItem("id_dep");
      //console.log("params",this.idprojet);
      this.getMaterials(this.idprojet);
      this.getProjectByDepName(this.idprojet);
      this.getTachesActivate(this.idprojet);
      this.getProjectNameById(this.idprojet);
      // this.getTacheActive(this.idprojet);
    })
  }

  getMaterials(id: number) {
    this.service.getMaterialByProjId(id).subscribe({
      next:(res)=>{
        this.nomMat=res.map((nom:any)=>nom.name);
        // this.priceMat=res.map((price:any)=>price.prix);
        this.priceMat=res.map((item:any)=>item.prix * item.quantity);
        // console.log("price:",res);
          this.chartBar = new Chart("line", {
            type: 'line',
            data: {
                labels:this.nomMat,
                datasets: [{
                    label: 'Materials Total Price',
                    data: this.priceMat,
                    borderColor: '#3e95cd',
                    fill: true,
                    backgroundColor: 'rgba(93, 175, 89, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
      },
      error:(err)=>{console.log('err', err);
      }
    });
  }
  getProjectNameById(id){
      this.service.getProjectById(id)
        .subscribe({
          next:(res)=>{
            this.nomProject=res.map((data)=>data.title)
            // console.log(this.nomProject);
            localStorage.setItem('name_pro', this.nomProject);
          }
        })
  }

  getTachesActivate(id){
    this.service.getTacheStatusProject(id)
        .subscribe({
            next:(res)=>{
              this.tacheProject=res
              this.service.getTacheStatusProjectNew(id)
                  .subscribe({
                    next:(res)=>{
                      this.tacheProjectNew=res
                      this.service.getTacheStatusProjectNewOther(id)
                      .subscribe({
                          next:(res)=>{
                            this.tacheProjectNewOther=res
                            this.chartDounat= new Chart("doughnut", {
                              type: 'doughnut',
                              data: {
                                  labels:["Project Completed","Project Incomplete","Project In Progress"],
                                  datasets: [{
                                      label: 'Count Employee By Taches',
                                      data: [this.tacheProjectNewOther[0],this.tacheProjectNew[0],this.tacheProject[0]],
                                      backgroundColor: [
                                        'rgb(56, 165, 44)',
                                        'rgb(225, 32, 32)',
                                        'rgb(234, 234, 67)',
                                      ],
                                      hoverOffset: 4
                                  }]
                              }
                          })

                          }
                      })
                    }
                  })
            }
        })
  }


  getProjectByDepName(id){
        this.service.getEmployeeTaches(id)
            .subscribe({
                next:(resp)=>{
                    this.taches=resp
                    this.count=resp.map((data)=>data.s)
                    this.employNom=resp.map((data)=>data.nom)
                    this.employPrenom=resp.map((data)=>data.prenom)
                    //console.log(this.employNom);

                    this.chartLine= new Chart("bar", {
                      type: 'bar',
                      data: {
                          labels: this.employNom,
                          datasets: [{
                              label: 'Count Employee By Taches',
                              data: this.count,
                              borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                              ],
                              // fill: false,
                              backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                              ],
                              borderWidth: 3
                          }]
                      },
                      options: {
                          scales: {
                              y: {
                                  beginAtZero: true
                              }
                          }
                      }
                  })

            },
            error:(err)=>{console.log('err', err);}
        })
  }

}
