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
  //readonly rootUrl = "https://mcdan-coding-exercise.azurewebsites.net";
  userData: any;
  token: any;

   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
});

 /*  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
}); */
 
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken')

  }

 

 registerNewUser(user : User){
 
  const body: User = {
    Username: user.Username,
    Password: user.Password
  } 
  console.log("body" , body);
  console.log("User" , User);
  return this.http.post('https://mcdan-coding-exercise.azurewebsites.net/api/v1/admin/register', body, {headers:this.headers});
 }




 userAuthentication(user : User) {
  console.log("User" , user);
  const data: User= {
    Username: user.Username,
    Password: user.Password
  }
  this.userData= data;
  console.log("data" , data);
  //console.log("User" , user);

  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post('https://mcdan-coding-exercise.azurewebsites.net/api/v1/admin/authenticate', data, { headers: reqHeader });
}

getWell(){
  let reqHeader
  if (this.token) {
    reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Token" + " " + localStorage.getItem('userToken')
    });
  } else {
    reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
  }
  console.log(this.token)
  console.log(reqHeader)
  return this.http.get('https://mcdan-coding-exercise.azurewebsites.net/api/v1/well', { headers: reqHeader }); 
  
}

getAnonymousWell(){
  return this.http.get('https://mcdan-coding-exercise.azurewebsites.net/api/v1/well'); 
  
}

getWellId(wellId){
  if (this.token) {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Token" + " " + localStorage.getItem('userToken')
    });
    const URL = `https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${wellId}`
    console.log(URL)
    return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${wellId}`, { headers: reqHeader }); 
  } else {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
    return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${wellId}`, { headers: reqHeader }); 
  }
  
}

getWellUWId(uwID){
  if (this.token) {
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Token" + " " + localStorage.getItem('userToken')
  });
  const URL = `https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${uwID}`
  return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well?uwid=${uwID}`); 
}else {
  var reqHeader = new HttpHeaders({ 
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
  console.log("Daaaaata: ", data);
  console.log(this.token);
  if (this.token) {
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Token" + " " + localStorage.getItem('userToken')
  });
  console.log("Local Storage:", localStorage.getItem('userToken'));
  return this.http.post(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});  
}else{
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
  });
  console.log("Local Storage:", localStorage.getItem('userToken'));
  return this.http.post(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});  
}
}

deleteSelectedWell(event){
  if (this.token) {
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Token" + " " + localStorage.getItem('userToken')
  });
  return this.http.delete(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${event}` ,{headers:reqHeader}); 
}
else{
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json'
  });
  return this.http.delete(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${event}` ,{headers:reqHeader});
}}


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
  console.log("Daaaaata: ", data);
  if (this.token) {
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Token" + " " + localStorage.getItem('userToken')
  });
  console.log("Local Storage:", localStorage.getItem('userToken'));
  return this.http.put(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});  
}else{
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Token" + " " + localStorage.getItem('userToken')
  });
  console.log("Local Storage:", localStorage.getItem('userToken'));
  return this.http.put(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/`,data, {headers:reqHeader});
}
}

    getWellHistory(id){
      if (this.token) {
        var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': "Token" + " " + localStorage.getItem('userToken')
        });
        console.log("Local Storage:", localStorage.getItem('userToken'));
        return this.http.get(`https://mcdan-coding-exercise.azurewebsites.net/api/v1/well/${id}/history`, {headers:reqHeader});  
      }
    }



}






