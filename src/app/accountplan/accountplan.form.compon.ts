import { SimpleChanges,Component,OnChanges, OnInit,Output,Input,EventEmitter } from '@angular/core';
import {PraticaCore}   from  '../share/pratica-core.service';
import {AccountPlan}  from '../model/accountplan';
import {AccountPlanDaoService} from '../dao/accountplan.dao.service';

@Component({
  selector: 'cp-accountplan-form',
  templateUrl: './accountplan.form.compon.html'
  
})
export class AccountPlanFormComponent implements OnInit,OnChanges {
  @Output('salved') doSave:EventEmitter<string>=new EventEmitter<string>();
  plan:AccountPlan=new AccountPlan();
  constructor(private pcore:PraticaCore,private acDao:AccountPlanDaoService) {
    
  }
  onSubmit() {
     this.acDao.insertOne(this.plan).subscribe({next:()=>{
        this.doSave.emit('ok');
     },error:(err)=>alert(err)});

  }
  ngOnChanges(changes:SimpleChanges) {
  }

  ngOnInit() {
  }

}
