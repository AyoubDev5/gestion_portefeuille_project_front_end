import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseURL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public redirectUrl: string = '';
  authenticated = false;
  public userInfo: any[] =[];
  id_dep;
  constructor( 
    private router: Router, 
    private http: HttpClient,
    private service: AuthService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.id_dep=localStorage.getItem('id_dep');

    this.http.get('http://localhost:8000/api/user', {withCredentials: true})
    .subscribe((res)=> {
      this.userInfo.push(res);
    })
  }

  logout(){
    this.http.post(`${baseURL}/api/logout`, {})
    .subscribe(() => this.authenticated = false);
    localStorage.clear();
    this.cookieService.deleteAll();
    this.redirect();
  }
  private redirect(): void {
    this.router.navigate([ this.redirectUrl ]);
  }

}