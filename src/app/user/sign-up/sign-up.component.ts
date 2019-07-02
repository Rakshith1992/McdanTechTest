import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, Form, NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  user : User;
  isRegistrationError : boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr:ToastrService) { }

  ngOnInit() {
    this.user=new User;
  }

  onSubmit(userName,password){
    this.userService.registerNewUser(this.user).subscribe(data=>{
      this.toastr.success("User registration successful");
      this.router.navigate(['/login']);
    },
    (err : HttpErrorResponse)=>{
      this.isRegistrationError = true;
    });
  } 
      
  
}
