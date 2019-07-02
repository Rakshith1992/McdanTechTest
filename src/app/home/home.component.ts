import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Well } from '../shared/well.model';
import { User } from '../shared/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  wellData: Well[];
  wellValue : any;
  well: Well;
  user: User;
  token: any;
  history = []

  constructor(private router: Router, private wellService: UserService, private toastr: ToastrService) { 
     this.token = localStorage.getItem('userToken');
  }

  ngOnInit() {
    this.user = new User;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  back(){
    this.router.navigate(['/login']);
  }

  viewWellByID(event: Event){
    let temp = []
    this.wellService.getWellId(event).subscribe((data: any)=>{
      temp.push(data);
      this.wellData = temp;

    });
  }

  getUWID(event: Event){
    this.wellService.getWellUWId(event).subscribe((data: any)=>{
      this.wellData=data;
    });
  }

  viewWell(){ 
    this.wellService.getWell().subscribe((data: any)=>{
      this.wellData=data;
      this.wellValue = data;
    });
  }
  
  createWell(){
    this.router.navigate(['/createwell']);
  }   

  deleteAWell(event: Event){
    this.wellService.deleteSelectedWell(event).subscribe(data=>{
      this.toastr.success("Well has been deleted");
      this.viewWell()
    });
  }

  editAWell(event: Event){
    this.router.navigate(['/createwell'], {state: {well: event}});
  }

  getHistory(event: Event){
    let data = [];
    this.wellService.getWellHistory(event).subscribe((data : any[])=>{
      data.forEach(element => {
        this.history.push(element);
      });
    });
    this.router.navigate(['/history'], {state: {history: this.history}});
  }
}