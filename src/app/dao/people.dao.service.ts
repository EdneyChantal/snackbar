import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {People}            from '../model/people';
import {PeopleView}        from '../model/peopleview'
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoService}        from './dao.service';

@Injectable()
export class PeopleDaoService extends DaoService  {
     
     constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }
     
     doSearch(research:string,aPeo:Array<People>):Array<People> {
        
       if (!research) {
         return aPeo;
       }
       if (aPeo) {
         return aPeo.filter(function(people){
            return people.name.toUpperCase().indexOf(research.toUpperCase()) >=0 ;
         });
       } else {
         return undefined;
       }
     }
     load(promise:Function) {
       let q = {} ; 
       q['query'] ={}; 
       q['query']['orderByChild']='name';
       q['query']['startAt']=this.newSubjectQuery();
       super.loadGlobal('People',promise,q);
     }
     loadSFind(promise:Function) {
        let q = undefined ; 
        super.loadGlobal('People',promise,q);
     }
     modelToView(pv:People):PeopleView {

        let pm:PeopleView=new PeopleView();

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
        pm.id =  pv.id;

        pm.cep =(pv.cep?this.ppcore.textToCep(pv.cep.toString()):undefined);
        pm.cnpj =(pv.cnpj?this.ppcore.textToCnpj(pv.cnpj.toString()):undefined);
        pm.cpf = (pv.cpf?this.ppcore.textToCpf(pv.cpf.toString()):undefined); 

        return pm;
     }
     viewToModel(pv:PeopleView):Object {
   
       let pm:Object ={} ; 

        pm['bairro'] = pv.bairro;
        pm['cidade'] = pv.cidade;
        pm['complemento'] = pv.complemento;
        pm['endereco'] = pv.endereco;
        pm['estado'] = pv.estado;
        pm['identidade'] = pv.identidade;
        pm['insestad'] = pv.insestad;
        pm['insmunic']  = pv.insmunic;
        pm['name'] = pv.name.toUpperCase();
        pm['numero'] = pv.numero;
        pm['observacao'] = pv.observacao ; 
        pm['outrosdoc'] = pv.outrosdoc;
        pm['rzsocial'] = (pv.rzsocial?pv.rzsocial.toUpperCase():undefined); 
        pm['status'] = pv.status; 
        pm['typePeople'] = pv.typePeople;
        pm['id']  = pv.id;

        pm['cep'] =this.ppcore.maskToNumber(pv.cep);
        pm['cnpj'] = this.ppcore.maskToNumber(pv.cnpj);
        pm['cpf'] = this.ppcore.maskToNumber(pv.cnpj); 
      
        pm =  this.ppcore.prepareModel(pm);
        
        return pm;

     }

}
