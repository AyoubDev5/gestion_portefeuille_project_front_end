import { Component, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';
import { baseURL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  navData = navbarData;
  public idp: any;
  public idd: any;

  authenticated = false;


  constructor( 
    private router: Router, 
    private http: HttpClient   
  ) { }

  ngOnInit(): void {
    this.idd = localStorage.getItem('id_dep');
    this.idp = localStorage.getItem('id_pro');
  }

  logout(){
    this.http.post(`${baseURL}/api/logout`, {}, {withCredentials: true})
    .subscribe(() => this.authenticated = false);
    localStorage.clear();
    this.redirect();
  }
  private redirect(): void {
    this.router.navigate(['']);
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;    
  }
  closeSidenav(): void{
    this.collapsed = false;
  }

}
