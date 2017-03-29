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
  @Input('allowInclude') allowInclude:Boolean;
  openForm:Boolean=false;
  portionArray:Array<PortionAccReceivable>=new Array();
  amountPortion:number=0;
  constructor(private pDao:PortionAccDaoService) { }

  toogleForm() {
    
    this.openForm = !this.openForm; 
    
  }
  ngOnInit() {
    
  }
  include(portion:Object) {
     let t:PortionAccReceivable;
     t = this.pDao.viewToModel(portion);
     this.amountPortion += (t.value/100);
     this.portionArray.push(t);
     this.openForm=false;
  }

}
