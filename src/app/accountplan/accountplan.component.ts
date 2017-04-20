import { Component, OnInit } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {AccountPlanDaoService} from '../dao/accountplan.dao.service';


@Component({
  selector: 'cp-accountplan',
  templateUrl: './accountplan.component.html'
})
export class AccountPlanComponent implements OnInit {
  toogleFplan:boolean=false;
  keyChosenUpdate:string;
  keyShowPlan:string;
  constructor(private pcore:PraticaCore,private ctDao:AccountPlanDaoService) { }

  
  ngOnInit() {
  
  }
  
}
