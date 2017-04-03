import { Component, OnInit } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {AccReceivableService}  from '../dao/accreceivable.dao.service';
import {AccountReceivable} from '../model/accountreceivable'  
import {PortionAccDaoObjService} from '../dao/portionAcc.daoObj.service'

@Component({
  selector: 'cp-accreceivable',
  templateUrl: './accreceivable.component.html',
  styleUrls: ['./accreceivable.component.css']
})
export class AccreceivableComponent implements OnInit {
  lct:AccountReceivable[]=new Array<AccountReceivable>();
  openForm:Boolean=false;
  chosenAccount:AccountReceivable;
  constructor(private ctDao:AccReceivableService,private pcore:PraticaCore,private porObDao:PortionAccDaoObjService) { }

  ngOnInit() {
     this.porObDao.load(_=>{});
  }
  toogleForm() {
    if (!this.openForm) {
      this.chosenAccount=undefined;
    }
    this.openForm = !this.openForm;
  }
  doChosenAccount(acc:AccountReceivable){
    this.chosenAccount = acc;
    this.openForm = true;
  }

}
