import { Component, OnInit,Input,OnChanges,SimpleChanges,EventEmitter,Output } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {ItemAccountPlanDaoService} from '../dao/itemaccplan.dao.service';
import {AccountPlan} from '../model/accountplan';
import {ItemAccountPlanV} from '../model/itemaccountplanV';
import {EAccPlanNature,ETypeAccPlan,Eanalytical} from '../model/ListEnums';
import {Observable} from 'rxjs';
import {ParamFormInsert} from './ParamFormInsert';

@Component({
  selector: 'cp-accountplan-itemform',
  templateUrl: './accountplanitemform.compon.html'
})
export class AccountPlanItemFormComponent implements OnInit,OnChanges {
  @Output('save') evSave:EventEmitter<any>=new EventEmitter<any>();
  @Input('paramInsert') paramInsert:ParamFormInsert;
  title:string;
  itemPlan:ItemAccountPlanV=new  ItemAccountPlanV();
  eAnalytical={};
  eAccPlanNature={};
  eTypeAccPlan={};

  constructor(private pcore:PraticaCore,private itDao:ItemAccountPlanDaoService) { 
      
      this.eAnalytical['enum'] =  Eanalytical;
      this.eAnalytical['keys'] =  Object.keys(this.eAnalytical['enum']).filter(k => !isNaN(Number(k)));
      this.eAccPlanNature['enum'] = EAccPlanNature;
      this.eAccPlanNature['keys'] = Object.keys(this.eAccPlanNature['enum']).filter(k => !isNaN(Number(k)));
      this.eTypeAccPlan['enum']= ETypeAccPlan;
      this.eTypeAccPlan['keys']= Object.keys(this.eTypeAccPlan['enum']).filter(k => !isNaN(Number(k)));
      
  }
  ngOnChanges(changes:SimpleChanges) {


  }
  onSubmit(){
    this.itemPlan.level = this.paramInsert.levelFather+1;
    this.itemPlan.stucture = (this.paramInsert.keyFather?this.paramInsert.keyFather + '.':'') + (this.paramInsert.lastNumberCod+1); 
    this.itemPlan.accountPlan = new AccountPlan();
    this.itemPlan.accountPlan.id=this.paramInsert.keyAccountPlan;
    let x=this.itDao.viewToModel(this.itemPlan);
    let subscr=this.itDao.insertOne(x.IdaccountPlan,x).subscribe({next:()=>{
          this.evSave.emit();
        },error:(err)=>{
          alert(err);
        }  
       });
  }

  ngOnInit() {
    
      
  }
  
}