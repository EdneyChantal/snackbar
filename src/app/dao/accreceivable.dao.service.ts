import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoService} from './dao.service';
import {AccountReceivable} from '../model/accountreceivable';
import {AccountReceivableView} from '../model/accountreceivableV'
import {Observable}  from 'rxjs' ; 


@Injectable()
export class AccReceivableService extends DaoService  {
     
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
     load(promise:Function) {
       let q = {} ; 
       q['query'] ={}; 
       q['query']['orderByChild']='namePeople';
       q['query']['startAt']=this.newSubjectQuery();

       super.loadGlobal('AccountReceivable',promise,q);
     }
     loadObserv(promise:Function):Observable<any> {
       return super.loadGlobalObserv('AccountReceivable');
     }
     viewToModel(view:Object):AccountReceivable{
        let r:AccountReceivable= new AccountReceivable();
        r.idPeople = view['people']['id'];
        r.namePeople = view['namePeople'];
        r.idDocument = view['IdDocument'];
        r.amount = this.ppcore.maskToNumber(view['amount']);
        r.interrestDay = view['interrestDay'];
        r.finanFine = view['finanFine'];
        r.description = view['description'];
        r.id =view['id'];
        return r; 

     }
     modelToView(view:AccountReceivable):AccountReceivableView {
        let r:AccountReceivableView=new AccountReceivableView();
        //r.idPeople = view['people']['id'];
        r.namePeople = view['namePeople'];
        r.idDocument = view['IdDocument'];
        r.description = view.description ; 
        r.amount = this.ppcore.textToMoeda(view.amount.toString());
        //r.interrestDay = view.interrestDay;
        //r.finanFine = view['finanFine'];
        r.id =view['id'];
        return r;

     }
     
} 