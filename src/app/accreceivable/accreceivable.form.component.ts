import { Component, OnInit } from '@angular/core';
import {PraticaCore}       from '../share/pratica-core.service';
import {AccountReceivable} from '../model/accountreceivable';
import {AccountReceivableView} from '../model/accountreceivableV';
import {PeopleDaoService} from '../dao/people.dao.service';
import {People}           from '../model/people';


@Component({
  selector: 'cp-accreceivable-form',
  templateUrl: './accreceivable.form.component.html',
  providers:[]
})
export class AccreceivableFormComponent implements OnInit {
  items:Array<any>=[];
  account:AccountReceivableView=new AccountReceivableView();
  openFcli:Boolean=false;
  vallowChaValue:Boolean=true;

  constructor(private pcore:PraticaCore) { }
 
  choosePeople(people:People) {
     this.account.people = people; 
     this.account.namePeople = people.name;
     this.openFcli = false;
  }
  disableValue(val:Boolean) {
    this.vallowChaValue = val;
  }
  ngOnInit() {
    /*this.items=[];
    this.pDao.loadSFind((arr:Array<People>) =>{
      arr.forEach(key=>this.items.push({id:key.id,text:key.name}));
      console.log(this.items);
      debugger;
    });*/
    //this.pcore.textToMoeda
  }
  

}
