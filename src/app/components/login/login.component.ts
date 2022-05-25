import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public redirectUrl: string = '/departments';
  hide = true;
  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

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
      this.authService.login(this.form.value).subscribe((res) => {
        if (res.success) {
          localStorage.setItem('token', res.jwt);
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
