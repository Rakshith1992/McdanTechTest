import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history : any;
  wellHistory = [];

  constructor( private router: Router ) {
    this.history = this.router.getCurrentNavigation().extras.state.history;
  }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/home']);
  }
}
