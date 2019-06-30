import { Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //readonly rootUrl = "https://mcdan-coding-exercise.azurewebsites.net";

   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
});

 /*  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
}); */
 
  constructor(private http: HttpClient) {
    

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
  console.log("data" , data);
  //console.log("User" , user);

  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.post('https://mcdan-coding-exercise.azurewebsites.net/api/v1/admin/authenticate', data, { headers: reqHeader });
}

getWell(){
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.get('https://mcdan-coding-exercise.azurewebsites.net/api/v1/well'); 
}



}
