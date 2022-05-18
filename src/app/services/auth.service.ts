import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from 'src/environments/environment';
import { IDepartments } from '../components/home/IDepartments';
import { IProjects } from '../components/project/IProjects';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  login(data): Observable<any> {
    return this.http.post(`${baseURL}/api/login`, data)
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getDep(): Observable<IDepartments[]>{
    return this.http.get<IDepartments[]>(`${baseURL}/api/departments`)
  }
  postDep(data): Observable<any> {
    return this.http.post(`${baseURL}/api/departments`, data);
  }

  getProjectsByDepId(id): Observable<IProjects[]>{
    return this.http.get<IProjects[]>(`${baseURL}/api/depart/${id}/Allproject`)
  }
}
