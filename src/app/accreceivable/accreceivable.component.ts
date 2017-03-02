import { Component, OnInit } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {AccReceivableService}  from '../dao/accreceivable.dao.service';
import {AccountReceivable} from '../model/accountreceivable'  

@Component({
  selector: 'cp-accreceivable',
  templateUrl: './accreceivable.component.html',
  styleUrls: ['./accreceivable.component.css']
})
export class AccreceivableComponent implements OnInit {
  lct:AccountReceivable[]=new Array<AccountReceivable>();
  constructor(private ctDao:AccReceivableService,private pcore:PraticaCore) { }

  ngOnInit() {
    
  }

}
