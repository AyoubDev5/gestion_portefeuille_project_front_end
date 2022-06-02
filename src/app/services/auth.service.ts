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
    return !!localStorage.getItem('jwt');
  }

  //department
  getDep(): Observable<IDepartments[]>{
    return this.http.get<IDepartments[]>(`${baseURL}/api/departments`)
  }
  postDep(data): Observable<any> {
    return this.http.post(`${baseURL}/api/departments`, data);
  }

//   //project
  getProjectsByDepId(id): Observable<IProjects[]>{
    return this.http.get<IProjects[]>(`${baseURL}/api/depart/${id}/Allproject`)
  }

//     //project calendar
    // getProjectsByDepIdCalendar(id): Observable<IProjects[]>{
    //   return this.http.get<IProjects[]>(`${baseURL}/api/depart/${id}/allProCalendar`)
    // }
  getProjects(): Observable<IProjects[]>{
    return this.http.get<IProjects[]>(`${baseURL}/api/projects`)
  }


  postProject(data): Observable<any> {
    return this.http.post(`${baseURL}/api/projects`, data);
  }
  updateProject(data:any, id:number){
    return this.http.put<any>(`${baseURL}/api/project/${id}`, data)
  }
  deleteProject(id:number){
    return this.http.delete<any>(`${baseURL}/api/project/${id}`)
  }
  userInfo(){
    return this.http.get(`${baseURL}/api/user`)
  }

//   allTeams(){
//     return this.http.get<ITeams[]>(`${baseURL}/api/teamsAction`)
//   }
// //post new team
//   postNewTeam(data): Observable<any> {
//     return this.http.post(`${baseURL}/api/teams`, data);
//   }
//   //employee and teamID
//   getTeamByProjetId(id_pro): Observable<ITeams[]>{
//     return this.http.get<ITeams[]>(`${baseURL}/api/projet/${id_pro}/team`);
//   }
//   getEmployByTeamId_TeamByProjId(id_pro,id_team): Observable<IEmployees[]>{
//     return this.http.get<IEmployees[]>(`${baseURL}/api/projet/${id_pro}/team/${id_team}/Allemploy`);
//   }
//   // empl
//   postEmployByTeamId(data): Observable<any> {
//     return this.http.post(`${baseURL}/api/employees`, data);
//   }
//   updateEmp(data:any, id:number){
//     return this.http.put<any>(`${baseURL}/api/employee/${id}`, data)
//   }
//   deleteEmpl(id:number){
//     return this.http.delete<any>(`${baseURL}/api/employee/${id}`)
//   }

//   //materials crud:
//   getMaterialByProjId(id): Observable<IMaterials[]>{
//     return this.http.get<IMaterials[]>(`${baseURL}/api/projet/${id}/Allmateriel`)
//   }
//   postNewMaterial(data): Observable<any> {
//     return this.http.post(`${baseURL}/api/materials`, data);
//   }
//   updateMaterial(data:any, id:number){
//     return this.http.put<any>(`${baseURL}/api/material/${id}`, data)
//   }
//   deleteMaterial(id:number){
//     return this.http.delete<any>(`${baseURL}/api/material/${id}`)
//   }

//   //tache crud:
//   getTacheByIdEmp(idpro,idteam,idemp): Observable<ITaches[]>{
//     return this.http.get<ITaches[]>(`${baseURL}/api/projet/${idpro}/team/${idteam}/employ/${idemp}/tache`)
//   }
//   postTacheByEmplId(data):Observable<any>{
//     return this.http.post(`${baseURL}/api/taches`, data);
//   }
//   updateTacheById(data:any,id:number){
//     return this.http.put<any>(`${baseURL}/api/tache/${id}`, data);
//   }

//   //sum materiel
//   getSumMat(id): Observable<IMaterials[]>{
//     return this.http.get<IMaterials[]>(`${baseURL}/api/projet/${id}/materialCount`)
//   }

//   //count employee
//   getCountEmp(id): Observable<IEmployees[]>{
//     return this.http.get<IEmployees[]>(`${baseURL}/api/projet/${id}/employCount`);
//   }

//   //count tache
//   getCountTache(id): Observable<ITaches[]>{
//     return this.http.get<ITaches[]>(`${baseURL}/api/projet/${id}/tacheCount`);
//   }

//   //send e-mail:
//   sendEmail(data):Observable<any>{
//     return this.http.post("https://node-server-construction.herokuapp.com/email", data);
//   }

//   //get tache active
//   getTacheActive(id): Observable<ITaches[]>{
//     return this.http.get<ITaches[]>(`${baseURL}/api/projet/${id}/tacheisActive`);
//   }

//   getTacheNoActive(id): Observable<ITaches[]>{
//     return this.http.get<ITaches[]>(`${baseURL}/api/projet/${id}/tacheisNotActive`);
//   }

  //change activities


}
