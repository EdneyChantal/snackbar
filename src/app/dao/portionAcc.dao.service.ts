import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {PortionAccReceivable}  from '../model/portionAccReceivable';
import {DaoService} from './dao.service';
import {Observable} from 'rxjs'


@Injectable()
export class PortionAccDaoService extends DaoService  {
     nameTable:string='PortionAccountReceivable';
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
     load(promise:Function) {
       super.loadGlobal(this.nameTable,promise);
     }

     viewToModel(view:Object):PortionAccReceivable {
       let ret:PortionAccReceivable = new PortionAccReceivable();
       ret.idAccReceivable = (view['AccReceivable']?view['AccReceivable']['id']:undefined) ;
       ret.maturityDate = new Date(view['maturityDate']['year'],view['maturityDate']['month']-1,view['maturityDate']['day']);
       ret.value = this.ppcore.maskToNumber(view['value']);
       return ret; 
     }
     loadOfAccount(keyAccount:string):Observable<Array<PortionAccReceivable>>{
        if (this.isChosenCompany()) {  
          let q = {} ; 
          q['query'] ={}; 
          q['query']['orderByChild']='idAccReceivable';
          q['query']['equalTo']=keyAccount;
          return  this.paf.database.list(this.pauthservice.getPathBaseSis()+"/"+this.nameTable,q);
        } else {
           return null;
        }
     }
     deleteOfAccount(keyAccount:string):Observable<any> {
        if (!this.isChosenCompany()) {  
           return null;
        }
        let q = {} ; 
        q['query'] ={}; 
        q['query']['orderByChild']='idAccReceivable';
        q['query']['equalTo']=keyAccount;
        let ob1 = this.paf.database.list(this.pauthservice.getPathBaseSis()+"/"+this.nameTable,q);
        let ob2 = Observable.fromPromise(ob1.remove() as Promise<void>);
        let ob3 = ob2.withLatestFrom(ob1);
        return ob3;   

     }
     
} 