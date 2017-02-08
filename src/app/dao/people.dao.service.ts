import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2';
import {Promise}           from 'firebase';
import {Observable}        from 'rxjs/observable';
import {AuthService}       from '../share/auth.service';
import {People}            from '../model/people';
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'

@Injectable()
export class PeopleDaoService  {
     olist :FirebaseObjectObservable<Object>;
     constructor(private authservice:AuthService,private af:AngularFire,private pcore:PraticaCore){
     }
     load(promise:Function )  {
       if (this.isChosenCompany()) {  
        this.olist = this.af.database.object(this.authservice.getPathBaseSis()+'/People');
        this.olist.subscribe({next:oct=>{
           let ar:Object[]=this.pcore.toArray(oct);
           promise(ar);
        }});
       } 
     }
     isChosenCompany():Boolean {
       return (this.authservice.getPathBaseSis()!==null);
     }
     remove(key:string,promise?:Function,reject?:Function) {
      let obj:Object={};
       obj[key]={};
       this.olist.update(obj).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));

     }
     update(key:string,pc:People,promise?:Function,reject?:Function) {
       let obj:Object={};
       obj[key]={};
       obj[key]=pc;
       this.olist.update(obj).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }

     insert(pc:People,promise?:Function,reject?:Function) {
       let id:string = this.pcore.geraId();
       let obj:Object={};
       obj[id]={};
       obj[id]=pc;
       this.olist.update(obj).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }
     /*modelToView(pm:Contract,pv:ContractView) {
        
        pv.description = pm.description;
        pv.namecontact = pm.namecontact;
        pv.emailContact = pm.emailContact;
        pv.qtdvagas =  pm.qtdvagas.toString();
        pv.valor    = this.pcore.textToMoeda(pm.valor.toString());
        pv.timemax = pm.timemax;

        let di:Object={};
        di['day']=new Date(pm['dtinivigencia']).getDay();
        di['month'] = new Date(pm['dtinivigencia']).getMonth()+1;
        di['year'] = new Date(pm['dtinivigencia']).getFullYear();
        pv.dtinivigencia = di as NgbDateStruct;
     
        let df:Object={};
        df['day']=new Date(pm['dtfimvigencia']).getDay();
        df['month'] = new Date(pm['dtfimvigencia']).getMonth()+1;
        df['year'] = new Date(pm['dtfimvigencia']).getFullYear();
        pv.dtfimvigencia = df as NgbDateStruct;

     }*/
     /*viewToModel(pm:Contract,pv:ContractView) {
        pm.description = pv['description'];      
        pm.namecontact = pv['namecontact'];
        pm.emailContact = pv['emailContact'];
        pm.qtdvagas    = +pv['qtdvagas'];
        pm.valor =  this.pcore.maskToNumber(pv['valor']);
        pm.timemax = pv['timemax'];
        pm.dtinivigencia = new Date(+pv['dtinivigencia']['year'],(+pv['dtinivigencia']['month'])-1,+pv['dtinivigencia']['day']);
        pm.dtfimvigencia = new Date(+pv['dtfimvigencia']['year'],(+pv['dtfimvigencia']['month'])-1,+pv['dtfimvigencia']['day']);
     }*/

}
