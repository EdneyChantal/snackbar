import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoService} from './dao.service';
import {AccountReceivable} from '../model/accountreceivable'



@Injectable()
export class AccReceivableService extends DaoService  {
     
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
     load(promise:Function) {
       super.loadGlobal('AccountReceivable',promise);
     }
     viewToModel(view:Object):AccountReceivable{
        let r:AccountReceivable= new AccountReceivable();
        r.people = view['people'];
        r.namePeople = view['namePeople'];
        r.idDocument = view['IdDocument'];
        r.amount = this.ppcore.maskToNumber(view['amount']);
        r.interrestDay = view['interrestDay'];
        r.finanFine = view['finanFine'];
         
        return r; 

     }
} 