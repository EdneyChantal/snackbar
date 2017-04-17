import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {PortionAccReceivable}  from '../model/portionAccReceivable';
import {DaoService} from './dao.service';
import {Observable} from 'rxjs'
import {Subject} from 'rxjs';


@Injectable()
export class PortionAccDaoService extends DaoService  {
     nameTable:string='PortionAccountReceivable';
     ob1:FirebaseListObservable<Array<PortionAccReceivable>>;

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
     deleteOfAccount(keyAccount:string,arrDelete:Array<string>):Observable<any> {
        if (!this.isChosenCompany()) {  
           return null;
        }
        let q = {} ; 
        let aKeysToDel:Array<string> = arrDelete;
        q['query'] ={}; 
        q['query']['orderByChild']='idAccReceivable';
        q['query']['equalTo']=keyAccount;
        let ob1= this.paf.database.list(this.pauthservice.getPathBaseSis()+"/"+this.nameTable,q);
        let subDel:Subject<any>=new Subject();
        let subscription = ob1.subscribe((arr)=>{
           arr.map(value=>{
             let keyFound=aKeysToDel.find((keyDel)=>keyDel==value.id);
             if (keyFound) {
                 ob1.remove(value.id).then((ok)=>subDel.next('deletou'));
             } 
          });
          subscription.unsubscribe();
         });
        
        return subDel;
     }
    
     
} 