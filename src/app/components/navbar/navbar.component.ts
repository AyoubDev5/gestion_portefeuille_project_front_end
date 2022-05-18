import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseURL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Emitters } from "../../emitters/emitters";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public redirectUrl: string = '';
  authenticated = false;

  constructor( 
    private router: Router, 
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
      }
    )
  }

  logout(){
    this.http.post(`${baseURL}/api/logout`, {}, {withCredentials: true})
    .subscribe(() => this.authenticated = false);
    localStorage.clear();
    this.redirect();
  }
  private redirect(): void {
    this.router.navigate([ this.redirectUrl ]);
  }

}
