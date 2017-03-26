import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {PortionAccReceivable}  from '../model/portionAccReceivable';
import {DaoService} from './dao.service';



@Injectable()
export class PortionAccDaoService extends DaoService  {
     
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
     load(promise:Function) {
       super.loadGlobal('PortionAccountReceivable',promise);
     }

     viewToModel(view:Object):PortionAccReceivable {
       let ret:PortionAccReceivable = new PortionAccReceivable();
       ret.id = this.ppcore.geraId();
       ret.maturityDate = new Date(view['maturityDate']['year'],view['maturityDate']['month']-1,view['maturityDate']['day']);
       ret.value = this.ppcore.maskToNumber(view['value']);
       return ret; 
     }
} 