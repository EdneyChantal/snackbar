import { Component, OnInit, Input} from '@angular/core';

@Component({
   selector: 'cp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit {
  @Input() 
  display:Boolean;
  constructor() { }

  ngOnInit() {
   
  }
  toDisplay(){
    this.display= true;
  }
  offDisplay(){
    this.display=false;
  }

}
