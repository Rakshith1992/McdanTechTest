import { Component, OnInit } from '@angular/core';
import { Well } from '../shared/well.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  currentWell: any;
  well:Well;
  constructor(private createService:UserService, private router: Router) { 
    if( this.router.getCurrentNavigation().extras.state) {
      this.currentWell = this.router.getCurrentNavigation().extras.state.well
      console.log("DATATA: ",this.currentWell)
    }
  }

  ngOnInit() {
    this.well=new Well;
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  OnSubmit(uwid,wellName,licenseNumber,area,field,totalDepth,drillDate,status){
    if(this.currentWell) {
      console.log("Latest:", this.currentWell);
      this.createService.updateCreateWell(this.currentWell).subscribe(data=>{
        console.log("Data", data);
        this.router.navigate(['/home']);
      }); 
    } else {
      this.createService.postCreateWell(this.well).subscribe(data=>{
        console.log("Data", data);
        this.router.navigate(['/home']);
  
      });
    }
    
  }

}
