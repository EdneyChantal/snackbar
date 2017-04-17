import { Component, OnInit } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {AccountPlanDaoService} from '../dao/accountplan.dao.service';
import {ParamPagePipe} from '../share/core/paramPagePipe';
import {Observable} from 'rxjs';
import {AccountPlan} from '../model/accountplan';

@Component({
  selector: 'cp-accountplan-grid',
  templateUrl: './accountplan.grid.compon.html'
})
export class AccountPlanGridComponent implements OnInit {
  reSearch:string;
  ctlGrid:ParamPagePipe=new ParamPagePipe();
  oList:Observable<Array<AccountPlan>>;
  list:Array<AccountPlan>=new Array<AccountPlan>();

  constructor(private pcore:PraticaCore,private ctDao:AccountPlanDaoService) { }

  ngOnInit() {
     this.ctlGrid.page = 1;
     this.ctlGrid.pageLength = 10;

     this.oList =this.ctDao.loadQuery();
     this.oList.subscribe(arr=>this.list=arr);
  }
   doSearch(pes){
    this.reSearch = pes;
    this.ctlGrid.page=1;
    this.ctDao.filterBy(pes);
  }
}
