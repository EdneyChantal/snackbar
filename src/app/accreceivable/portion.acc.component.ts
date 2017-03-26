import { Component, OnInit,Input } from '@angular/core';
import {AccountReceivable} from '../model/accountreceivable'
import {PortionAccReceivable} from '../model/portionAccReceivable';
import {PortionAccDaoService} from '../dao/portionAcc.dao.service';

@Component({
  selector: 'cp-portion-acc',
  templateUrl: './portion.acc.component.html',
  styleUrls: []
})
export class PortionAccrReComponent implements OnInit {
  @Input('accreceivable') accreceivable:AccountReceivable;
  openForm:Boolean=false;
  portionArray:Array<PortionAccReceivable>=new Array();
  
  constructor(private pDao:PortionAccDaoService) { }

  toogleForm() {
    this.openForm = !this.openForm; 

  }
  ngOnInit() {
    
  }
  include(portion:Object) {
     this.portionArray.push(this.pDao.viewToModel(portion));
     this.openForm=false;
  }

}
