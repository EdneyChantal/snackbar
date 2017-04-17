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

     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
} 