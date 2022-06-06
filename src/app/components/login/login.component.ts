import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public redirectUrl: string = '/departments';
  hide = true;
  form: FormGroup;
  response;

  constructor(
    private http: HttpClient,
    private router: Router, 
    private authService: AuthService,
    private cookies: CookieService
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  LoginHundler() {
    if (this.form.valid) {
      this.http.post('http://localhost:8000/api/login',this.form.value,{
        withCredentials:true
      }).subscribe((res) => {
        this.response=res;
        if (this.response.success) {
          localStorage.setItem('jwt', this.response.jwt);
          this.redirect();
        } else {
          alert('Incorrect Credentials');
        }
      });
    }
  }
  private redirect(): void {
    this.router.navigate([this.redirectUrl]);
  }
}

//import { HttpHeaders } from '@angular/common/http';
//const headers = new HttpHeaders();
//headers
//.set('Content-Type', 'application/json')
//.set('Access-Control-Allow-Origin', '*');