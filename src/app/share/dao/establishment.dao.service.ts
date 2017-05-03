import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../auth.service';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap';
import {PraticaCore}       from '../pratica-core.service';
import {Observable} from 'rxjs'
import {Subject} from 'rxjs';


@Injectable()
export class EstablishmentDaoService  {
     nameTable:string='Establishments';
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        
     }
}
    