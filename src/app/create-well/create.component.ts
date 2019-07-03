import { Component, OnInit } from '@angular/core';
import { Well } from '../shared/well.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  currentWell: any;
  well:Well;
  
  constructor(private createService:UserService, private router: Router, private toastr: ToastrService) { 
    if( this.router.getCurrentNavigation().extras.state) {
      this.currentWell = this.router.getCurrentNavigation().extras.state.well
    }
  }

  ngOnInit() {
    this.well=new Well;
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  back(){
    this.router.navigate(['/home']);
  }

  OnSubmit(uwid,wellName,licenseNumber,area,field,totalDepth,drillDate,status){
    if(this.currentWell) {
      this.createService.updateCreateWell(this.currentWell).subscribe(data=>{
      }); 
    this.toastr.success("Well has been updated");
    this.router.navigate(['/home']);
    } else {
      this.createService.postCreateWell(this.well).subscribe(data=>{   
      });
    this.toastr.success("Well has been created");  
    this.router.navigate(['/home']);
    }  
  }
}
