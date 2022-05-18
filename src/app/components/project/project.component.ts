import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseURL } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IProjects } from './IProjects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects: any[] =[];


  constructor( 
  private http: HttpClient,
  private route: ActivatedRoute,
  private allProjects: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      //console.log("params",id);
      this.GetAllProjects(id);
    })
  }

  GetAllProjects(id) {
    this.allProjects.getProjectsByDepId(id).subscribe(data=>{
      console.log("projects",data)
    });
  }
}
