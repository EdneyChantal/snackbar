import {Injectable}        from '@angular/core';
import {AuthService}       from '../share/auth.service';
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoObjService}     from './dao.Object.service';
import {AngularFire} from 'angularfire2';
import {PortionAccReceivable} from '../model/portionAccReceivable';
import {Observable} from 'rxjs'

@Injectable()
export class PortionAccDaoObjService extends DaoObjService  {
     
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
     load(promise:Function) {
       super.loadGlobal('PortionAccountReceivable',promise);
     }
     insertArray(keyAccountRec:string,portArray:Array<PortionAccReceivable>):Observable<any> {
       let mobj={};
       portArray.forEach((value)=>{
          let key=this.ppcore.geraId(); 
          value['idAccReceivable']=keyAccountRec;
          value['id']=key;
          mobj[key]={};
          mobj[key]=this.ppcore.prepareModel(value);
       });
       let obs=Observable.fromPromise(this.oobject.update(mobj) as Promise<any>);
       return obs;
     }
     
     
} 