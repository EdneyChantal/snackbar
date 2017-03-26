import { Component, OnInit } from '@angular/core';
import {PraticaCore}       from '../share/pratica-core.service';
import {AccountReceivable} from '../model/accountreceivable'  
import {PeopleDaoService} from '../dao/people.dao.service';
import {People}           from '../model/people';


@Component({
  selector: 'cp-accreceivable-form',
  templateUrl: './accreceivable.form.component.html',
  styleUrls: [] ,
  providers:[]
})
export class AccreceivableFormComponent implements OnInit {
  items:Array<any>=[];
  account:AccountReceivable=new AccountReceivable();
  openFcli:Boolean=false;

  constructor(private pcore:PraticaCore) { }
 
  choosePeople(people:People) {
     this.account.people = people; 
     this.openFcli = false;
     this.account.namePeople = people.name;
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
