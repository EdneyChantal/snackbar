import { Component, OnInit,Input } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {ItemAccountPlanDaoService} from '../dao/itemaccplan.dao.service';
import {ItemAccountPlan} from '../model/itemaccountplan';
import {NodeTree} from '../model/nodeTree';
import {Observable} from 'rxjs';

@Component({
  selector: 'cp-accountplan-itemgrid',
  templateUrl: './accountplanitemgrid.compon.html'
})
export class AccountPlanItemGridComponent implements OnInit {
  @Input('keyplan') keyplan:string;
  nodes:Array<NodeTree>=new Array<NodeTree>();
  obS:Observable<Array<ItemAccountPlan>>;

  constructor(private pcore:PraticaCore,private itDao:ItemAccountPlanDaoService) { }
  ngOnInit() {
    this.obS =  this.itDao.loadAllPlan(this.keyplan);
    this.obS.subscribe((arr)=>{
         this.nodes = this.itDao.toTreeNode(arr);
     });
    

  
  }
  
}