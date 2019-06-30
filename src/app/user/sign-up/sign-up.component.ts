import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, Form, NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  user : User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user=new User;
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form! = null){
      form.reset();
      this.user= {
      Username: '',
      Password: ''
      };
    }
  }

  onSubmit(userName,password){
      this.userService.registerNewUser(this.user).subscribe(
      response =>{
        if(response == true){
          console.log('User' + this.user.Username + 'has been created');
          //this.resetForm(form);
        }
        //
        else{
          error => {
            console.log(error.error);
        }
       
        }
      },

        
    ); 

  }

}


/* this.userService.registerNewUser(form.value)
      .subscribe((data:any) =>{
        if(data.succeeded == true)
          this.resetForm(form);
      }); */