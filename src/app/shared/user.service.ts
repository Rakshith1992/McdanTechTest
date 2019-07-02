import { Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { User } from './user.model';
import { Well } from './well.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken')
  }

  registerNewUser(user : User){
    const body: User = {
    Username: user.Username,
    Password: user.Password
    } 
  let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post('https://mcdan-coding-exercise.azurewebsites.net/api/v1/admin/register', body, {headers:reqHeader});
  }

  userAuthentication(user : User) {
    const data: User= {
      Username: user.Username,
      Password: user.Password
    }
    this.userData= data;
    let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post('https://mcdan-coding-exercise.azurewebsites.net/api/v1/admin/authenticate', data, { headers: reqHeader });
  }

  getWell(){
    let reqHeader;
    if (this.token) {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Token" + " " + localStorage.getItem('userToken')
      });
    } else {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json'
      });
    }
    return this.http.get('https://mcdan-coding-exercise.azurewebsites.net/api/v1/well', { headers: reqHeader });   
  }

  getAnonymousWell(){
    return this.http.get('https://mcdan-coding-exercise.azurewebsites.net/api/v1/well'); 
    
  }

  getWellId(wellId){
    let reqHeader;
    if (this.token) {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Token" + " " + localStorage.getItem('userToken')
      });
      return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${wellId}`, { headers: reqHeader }); 
    } else {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
      });
      return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${wellId}`, { headers: reqHeader }); 
    }  
  }

  getWellUWId(uwID){
    let reqHeader;
    if (this.token) {
    reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Token" + " " + localStorage.getItem('userToken')
    });
    return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well?uwid=${uwID}`); 
    }else {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
      });
      return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well?uwid=${uwID}`, { headers: reqHeader }); 
    }  
  }

  postCreateWell(well: Well){
    const data = {
      uwid: well.uwid,
      wellName: well.wellName,
      licenseNumber: well.licenseNumber,
      area: well.area,
      field: well.field,
      totalDepth: well.totalDepth,
      drillDate: well.drillDate,
      status: well.status,
    };
    let reqHeader;
    if (this.token) {
    reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Token" + " " + localStorage.getItem('userToken')
    });
    return this.http.post(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});  
    }else{
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
      });
      return this.http.post(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});  
    }
  }

  deleteSelectedWell(event){
    let reqHeader;
    if (this.token) {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Token" + " " + localStorage.getItem('userToken')
      });
      return this.http.delete(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${event}` ,{headers:reqHeader}); 
    }
    else{
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json'
      });
      return this.http.delete(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${event}` ,{headers:reqHeader});
    } 
  }


  updateCreateWell(well:Well){
    let data = {
      uwid: well.uwid,
      wellName: well.wellName,
      licenseNumber: well.licenseNumber,
      area: well.area,
      field: well.field,
      totalDepth: well.totalDepth,
      drillDate: well.drillDate,
      status: well.status
    };
    let reqHeader;
    if (this.token) {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Token" + " " + localStorage.getItem('userToken')
      });
      return this.http.put(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});  
    }else{
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Token" + " " + localStorage.getItem('userToken')
      });
    return this.http.put(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});
    }
  }

  getWellHistory(id){
    let reqHeader;
    if (this.token) {
      reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Token" + " " + localStorage.getItem('userToken')
      });
      return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${id}/history`, {headers:reqHeader});  
    }
  }
}






