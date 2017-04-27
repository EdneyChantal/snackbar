import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoService} from './dao.service';
import {Observable} from 'rxjs'
import {Subject} from 'rxjs';
import {ItemAccountPlan} from '../model/itemaccountplan';
import {ItemAccountPlanV} from '../model/itemaccountplanV';
import {NodeTree} from '../model/nodeTree';
import {EAccPlanNature,ETypeAccPlan,Eanalytical} from'../model/ListEnums'

@Injectable()
export class ItemAccountPlanDaoService extends DaoService  {
    nameTable:string='AccountPlan';

    constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }

    loadAllPlan(keyAccPlan:string):Observable<Array<ItemAccountPlan>> {
       let q = {} ; 
       q['query'] ={}; 
       q['query']['orderByChild']='structure';

       return this.paf.database.list(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan,q);

    } 
    toKey(chave:string):string{
        return chave.replace(/\./gi,"-");
    }
    toAttr(key:string):string {
        return key.replace(/-/gi,".");
    }
    viewToModel(it:ItemAccountPlanV):ItemAccountPlan {
      let ret:ItemAccountPlan=new ItemAccountPlan();
      ret.analytical=(Eanalytical[it.analytical]=='TRUE');
      ret.nature=EAccPlanNature[it.nature];
      ret.type=ETypeAccPlan[it.type];
      ret.level= it.level;
      ret.name= it.name;
      ret.structure = it.stucture;
      ret.IdaccountPlan=it.accountPlan.id;
      return ret;     

    }
    delete(item:ItemAccountPlan) {

        
    }
    insertOne(keyAccPlan:string,it:ItemAccountPlan):Observable<string>{
      let key:string=this.toKey(it.structure);
      let sub1:Subject<any>=new Subject();
      let ob1=this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan+'/'+key);
      let subs1=ob1.subscribe({next:obj=>{
         ob1.update(it).then(()=>sub1.next('ok')).catch((err)=>sub1.error(err));  
      },error:(err)=>{
         sub1.error(err);
      }
      });
      return sub1;
    }

    toTreeNode(arr:Array<ItemAccountPlan>,maskFather?:string,levelFather?:number):Array<NodeTree> {
        // 1) Selecionar todos os item filhos da mascaraPai,se tiver nula é o primeiro nivel 
        // 2) montar numa estrutura de array toTreeNode
        // 3) devolver o array montado 
        let ret:Array<NodeTree>=new Array<NodeTree>();

        arr.forEach((elemento,ind)=>{
           let eleValido = false ; 
           if ((!maskFather) && (elemento.level === 1)) {
              eleValido = true;
            } else if ((maskFather) &&  (elemento.structure===maskFather)) {
              eleValido = false ;   
            } else if ((maskFather) &&  (elemento.structure.indexOf(maskFather,0) === 0)) {
              if (elemento.level > (levelFather+1)) {
                  eleValido = false;
              } else {
                eleValido = true;                 
              }
            }
            if (eleValido) {  
              let ndt:NodeTree=new NodeTree();
              ndt.key = elemento.structure;
              ndt.name = elemento.structure + ' ' + elemento.name ; 
              ndt.level = elemento.level;
              ndt.analytical =  elemento.analytical;

              let arrayfilho = arr.slice(ind+1); 
              let  endindex = arrayfilho.findIndex(function(elemf){
                  return elemf.level <= elemento.level;
              });
              
              if (!elemento.analytical) {
                  ndt.children = this.toTreeNode(arrayfilho.slice(0,endindex),elemento.structure,elemento.level);
              }
              ret.push(ndt);
           }  
        });
        return ret;
    }

}