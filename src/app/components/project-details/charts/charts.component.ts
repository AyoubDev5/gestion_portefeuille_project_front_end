import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart,registerables  } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  myChart:any=[];
  chartActive:any=[];
  public materials: any[] =[];
  public idprojet: number;
  public nomMat: any;
  public priceMat: any;
  public Qte: any;
  public active:any;
  public noActive:any;
  constructor(
    private service: AuthService,
    private router: ActivatedRoute,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.idprojet = params['id'];
      //console.log("params",this.idprojet);
      this.getMaterials(this.idprojet);
      this.getTacheActive(this.idprojet);
    })
  }

  getMaterials(id: number) {
    this.service.getMaterialByProjId(id).subscribe({
      next:(res)=>{
        this.nomMat=res.map((nom:any)=>nom.name);
        // this.priceMat=res.map((price:any)=>price.prix);
        this.priceMat=res.map((item:any)=>item.prix * item.quantity);
        // console.log("price:",res);
          this.myChart = new Chart("canvas", {
            type: 'bar',
            data: {
                labels:this.nomMat,
                datasets: [{
                    label: 'Prix des Materials',
                    data: this.priceMat,
                    borderColor: '#3e95cd',
                    // fill: false,
                    backgroundColor: 'rgba(93, 175, 89, 0.1)',
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
        });
      },
      error:(err)=>{console.log('err', err);
      }
    });
  }
  getTacheActive(id: number) {
    this.service.getTacheActive(id).subscribe({
      next:(res)=>{
        this.active=res
         this.service.getTacheNoActive(id).subscribe({
            next:(resp)=>{
                this.noActive=resp;

                this.chartActive = new Chart("pie", {
                  type: 'pie',
                  data: {
                    labels: [
                      'Tache Is Not Active',
                      'Tache Is Active',
                    ],
                    datasets: [{
                      label: 'My First Dataset',
                      data: [this.active, this.noActive ],
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                      ],
                      hoverOffset: 4,
                      offset:10
                    }]
                  },
              });
            }
         })
      },
      error:(err)=>{console.log('err', err);
      }
    });
  }
}
