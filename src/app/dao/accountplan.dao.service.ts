import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoService} from './dao.service';
import {Observable} from 'rxjs'
import {Subject} from 'rxjs';
import {AccountPlan} from '../model/accountplan';


@Injectable()
export class AccountPlanDaoService extends DaoService  {
     nameTable:string='AccPlanCab';

     
     loadQuery(): Observable<Array<AccountPlan>> {
       let q = {} ; 
       q['query'] ={}; 
       q['query']['orderByChild']='name';
       q['query']['startAt']=this.newSubjectQuery();

       return this.paf.database.list(this.pauthservice.getPathBaseSis() + '/' + this.nameTable,q);
       
     }
     loadOne(key:string):Observable<AccountPlan> {
       return  this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/' + key);
     }
     insertOne(pap:AccountPlan):Observable<any> {
       let key:string;
       let obj={};
       let sub1:Subject<any>=new Subject();
       if (pap.id) {
         key=pap.id;
       } else {
         key=this.ppcore.geraId();
         pap.id=key;
       }
       obj[key]={};
       obj[key]=this.ppcore.prepareModel(pap);
       let obs1 = this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable);
       let subsc1 = obs1.subscribe({next:()=>{
          obs1.update(obj).then(()=>{
            sub1.next('inseriu');
          });
          subsc1.unsubscribe();
       },error:(err)=>{
          sub1.error(err);
          subsc1.unsubscribe();
       }
      });
      return sub1;

     }


     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
} 