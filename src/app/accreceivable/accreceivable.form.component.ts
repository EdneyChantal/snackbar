import {Component,SimpleChanges,OnChanges,OnInit,Output,EventEmitter,Input} from '@angular/core';
import {PraticaCore}       from '../share/pratica-core.service';
import {AccountReceivable} from '../model/accountreceivable';
import {AccountReceivableView} from '../model/accountreceivableV';
import {PeopleDaoService} from '../dao/people.dao.service';
import {PortionAccReceivable}    from '../model/portionAccReceivable'
import {People}           from '../model/people';
import {AccReceivableService} from '../dao/accreceivable.dao.service';
import {PortionAccDaoObjService} from '../dao/portionAcc.daoObj.service';
import {PortionAccDaoService} from '../dao/portionAcc.dao.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/single';

@Component({
  selector: 'cp-accreceivable-form',
  templateUrl: './accreceivable.form.component.html',
  providers:[]
})
export class AccreceivableFormComponent implements OnInit,OnChanges {
  @Output('saved') eeSaved:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  @Input('chosenAccount') chosenAccount:AccountReceivable;
  items:Array<any>=[];
  account:AccountReceivableView=new AccountReceivableView();
  openFcli:Boolean=false;
  vallowChaValue:Boolean=true;
  dontSave:Boolean=true;

  portionArray:Array<PortionAccReceivable>;
  portionArrayCh:Array<PortionAccReceivable>;

  constructor(private pcore:PraticaCore,
             private accDao:AccReceivableService,
             private porObjDao:PortionAccDaoObjService,
             private porDao:PortionAccDaoService,
             private peoDao:PeopleDaoService) { }
  
  ngOnChanges(changes:SimpleChanges) {
    
    if (changes['chosenAccount'].currentValue) {
       this.loadObjects(changes['chosenAccount'].currentValue);
     }
  }
  loadObjects(acc:AccountReceivable) {
     this.account=this.accDao.modelToView(acc);
     let sing1=this.peoDao.loadOnePeople(acc.idPeople);
     let sing2=this.porDao.loadOfAccount(acc.id);
     let singz = Observable.zip(sing1,sing2);
     singz.subscribe(arr=>{
       this.account.people = arr[0];
       this.portionArrayCh = arr[1];
       this.vallowChaValue = false;
       this.dontSave = false;
     },err=>console.log(err));

  }


  choosePeople(people:People) {
     this.account.people = people; 
     this.account.namePeople = people.name;
     this.openFcli = false;
  }
  disableValue(val:Boolean) {
    this.vallowChaValue = val;
  }
  allowSave(pportionArray:Array<PortionAccReceivable>) {
   this.portionArray = pportionArray;
  }
  onSubmit() {
    
     let acc:AccountReceivable=new AccountReceivable();
     if (this.chosenAccount) {
        acc.id = this.chosenAccount.id;
     } else {
         acc.id= this.pcore.geraId();
     }    
     acc = this.accDao.viewToModel(this.account);
     let ob1 = this.accDao.insertObservable(acc);
     let ob2 = this.porObjDao.insertArray(acc.id,this.portionArray);      
     let obm = Observable.zip(ob1,ob2).single();
     obm.subscribe(()=>this.eeSaved.emit(true));
  }

  ngOnInit() {
  
  }
  

}
