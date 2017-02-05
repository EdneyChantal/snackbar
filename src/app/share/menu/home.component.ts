import { Component, OnInit } from '@angular/core';
import {Observable}  from 'rxjs/Rx' 

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  time:string;
  extime:Observable<number>;
  constructor() { }

  ngOnInit() {
     this.extime = Observable.timer(1000,1000);
     this.extime.subscribe(t=>this.time=new Date().toTimeString());
     

  }

}
