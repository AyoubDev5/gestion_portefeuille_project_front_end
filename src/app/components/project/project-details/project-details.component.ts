import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id; 
  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      //console.log("params",this.id);
      let idd = String(this.id);
      localStorage.setItem("idpro", idd)
    })
  }

}
