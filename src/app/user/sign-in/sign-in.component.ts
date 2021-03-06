import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  isLoginError : boolean = false;

  constructor(private userService : UserService,private router : Router) { }
  
  ngOnInit() {
    this.user=new User;
  }

  OnSubmit(userName,password){
    this.userService.userAuthentication(this.user).subscribe((data : any)=>{
    localStorage.setItem('userToken',data.token);
    this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }

  anonymousWellData(){
    localStorage.removeItem('userToken');
    this.userService.getAnonymousWell().subscribe((data : any)=>{
    this.router.navigate(['/home']);
   });
  }
}