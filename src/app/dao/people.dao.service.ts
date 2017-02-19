import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2';
import {Promise}           from 'firebase';
import {Observable}        from 'rxjs/observable';
import {AuthService}       from '../share/auth.service';
import {People}            from '../model/people';
import {PeopleView}                  from '../model/peopleview'
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
     modelToView(pv:People,pm:PeopleView) {

        pm.bairro = pv.bairro;
        pm.cidade = pv.cidade;
        pm.complemento = pv.complemento;
        pm.endereco = pv.endereco;
        pm.estado = pv.estado;
        pm.identidade = pv.identidade;
        pm.insestad = pv.insestad;
        pm.insmunic  = pv.insmunic;
        pm.name = pv.name;
        pm.numero = pv.numero;
        pm.observacao = pv.observacao ; 
        pm.outrosdoc = pv.outrosdoc;
        pm.rzsocial = pv.rzsocial ; 
        pm.status = pv.status; 
        pm.typePeople = pv.typePeople;

        pm.cep = this.pcore.textToCep(pv.cep.toString());
        pm.cnpj = this.pcore.textToCnpj(pv.cnpj.toString());
        pm.cpf = this.pcore.textToCpf(pv.cnpj.toString()); 


     }
     viewToModel(pm:People,pv:PeopleView) {

        pm.bairro = pv.bairro;
        pm.cidade = pv.cidade;
        pm.complemento = pv.complemento;
        pm.endereco = pv.endereco;
        pm.estado = pv.estado;
        pm.identidade = pv.identidade;
        pm.insestad = pv.insestad;
        pm.insmunic  = pv.insmunic;
        pm.name = pv.name;
        pm.numero = pv.numero;
        pm.observacao = pv.observacao ; 
        pm.outrosdoc = pv.outrosdoc;
        pm.rzsocial = pv.rzsocial ; 
        pm.status = pv.status; 
        pm.typePeople = pv.typePeople;

        pm.cep =this.pcore.maskToNumber(pv.cep);
        pm.cnpj = this.pcore.maskToNumber(pv.cnpj);
        pm.cpf = this.pcore.maskToNumber(pv.cnpj); 

        pm =  this.pcore.prepareModel(pm);

     }

}
