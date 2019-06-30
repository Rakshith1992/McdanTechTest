import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
//import { HttpErrorResponse } from '@angular/common/http';
import { Well } from '../shared/well.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  userClaims: any;
  wellData: Well;
  filterId: number;
  
  //isWellError : boolean = false;

  constructor(private router: Router, private wellService: UserService) { }

  ngOnInit() {
    this.filterId= 1;
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  viewWell(option = {}){
    if (option){
      console.log()
    }
    this.wellService.getWell().subscribe((data: any)=>{
      this.wellData=data;
      console.log(this.wellData);
    });
    /* (err : HttpErrorResponse)=>{
      this.isWellError = true;
    }); */

  }

}