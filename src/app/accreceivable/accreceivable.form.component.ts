import { Component, OnInit } from '@angular/core';
import {PraticaCore}       from '../share/pratica-core.service';
import {AccountReceivable} from '../model/accountreceivable'  
import {PeopleDaoService} from '../dao/people.dao.service';
import {People}           from '../model/people';

@Component({
  selector: 'cp-accreceivable-form',
  templateUrl: './accreceivable.form.component.html',
  styleUrls: [] ,
  providers:[PeopleDaoService]
})
export class AccreceivableFormComponent implements OnInit {
  itemPe:Array<any>=[];
  constructor(private pDao:PeopleDaoService,private pcore:PraticaCore) { }

  ngOnInit() {
    //this.pDao.loadSFind( arr:Array => { })
  }
  processPeople(arr:Array<People>) {
     arr.forEach(key=>this.itemPe.push({id:key.}))

  }

}
