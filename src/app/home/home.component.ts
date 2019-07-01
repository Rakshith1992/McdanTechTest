import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
//import { HttpErrorResponse } from '@angular/common/http';
import { Well } from '../shared/well.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  userClaims: any;
  wellData: Well[];
  wellIdData: Well[];
  filterId: number;
  wellID: number;
  currentItemId: any;
  tempWells : any;
  userData : any;
  user: User;
  token: any;
  history = []
  
  //isWellError : boolean = false;

  constructor(private router: Router, private wellService: UserService) { 
    
     // this.userData = this.router.getCurrentNavigation().extras.state.well
     this.token = localStorage.getItem('userToken');
  
    
    //console.log('token: ', token);
  }

  ngOnInit() {
    this.user = new User;
    this.filterId= 1;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  back(){
    this.router.navigate(['/login']);
  }

  viewWell1(event: Event){
    let item = event.target;
    console.log(event);
      //this.currentItemId = item  
    let temp = []
    //console.log(this.currentItemId)
    this.wellService.getWellId(event).subscribe((data: any)=>{
      temp.push(data)
      this.wellData = temp
      //this.wellIdData=data;
      //console.log(this.wellData);
    });
  }



  getUWID(event: Event){
    //let item = event.target;
    //console.log(event);
      //this.currentItemId = item  
    let wellUID = []
    //console.log(this.currentItemId)
    this.wellService.getWellUWId(event).subscribe((data: any)=>{
      console.log("DATA:",data );
      this.wellData=data;
      console.log("wellData:",this.wellData );
      //this.wellIdData=data;
      //console.log(this.wellData);
    });
  }

  viewWell(){
   
      this.wellService.getWell().subscribe((data: any)=>{
        this.wellData=data;
        this.tempWells = data;
        console.log(this.wellData);
      });
    }
  

   /*  crudOperation(){
      this.router.navigate(['/crud']);
    } */  

    deleteAWell(event: Event){
      console.log("DELETE", event);
      this.wellService.deleteSelectedWell(event).subscribe(data=>{
        console.log(data);
      });
  
    }

    editAWell(event: Event){
      console.log(event)
      this.router.navigate(['/crud'], {state: {well: event}});
    }

    getHistory(event: Event){
      console.log(event);
      let data = []
      this.wellService.getWellHistory(event).subscribe((data : any[])=>{
        console.log(data)
        data.forEach(element => {
          console.log(element)
          this.history.push(element)
        });
      });
      this.router.navigate(['/history'], {state: {history: this.history}});
    }

}