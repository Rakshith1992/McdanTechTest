import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent{
  title = 'CodingExercise';
  register;

  constructor(){

  }

  /* ngOnInit(){
    this.register = {
      username: '',
      password: ''
    };
  } */

  /* registerUser(){
    this.registerService.registerNewUser(this.register).subscribe(
      response =>{
        console.log('User' + this.register.username + 'has been created');
      },
      error => {
        console.log('error', error);
      }  
    );
  } */
}
