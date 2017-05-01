import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import {AuthService}       from '../share/auth.service';
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoService} from './dao.service';
import {Observable} from 'rxjs'
import {Subject} from 'rxjs';
import {ItemAccountPlan} from '../model/itemaccountplan';
import {ItemAccountPlanV} from '../model/itemaccountplanV';
import {AccountPlan} from '../model/accountplan';
import {NodeTree} from '../model/nodeTree';
import {EAccPlanNature,ETypeAccPlan,Eanalytical} from'../model/ListEnums';
import {NgSelectModel}     from '../model/ngSelectModel';

@Injectable()
export class ItemAccountPlanDaoService extends DaoService  {
    nameTable:string='AccountPlan';
    oFireObject:FirebaseObjectObservable<any>;
    oFireList:FirebaseListObservable<any>;
    
    constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
     }

    loadAllPlan(keyAccPlan:string):Observable<Array<ItemAccountPlan>> {
       let q = {} ; 
       q['query'] ={}; 
       q['query']['orderByChild']='structure';

       this.oFireList = this.paf.database.list(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan,q);
       return this.oFireList;

    } 
    loadAllPlanO(keyAccPlan:string):Observable<Object> {
       this.oFireObject = this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan);
       return this.oFireObject;
    } 
    toKey(chave:string):string{
        return chave.replace(/\./gi,"-");
    }
    toAttr(key:string):string {
        return key.replace(/-/gi,".");
    }
    modelToView(it:ItemAccountPlan):ItemAccountPlanV {
      let ret:ItemAccountPlanV=new ItemAccountPlanV();
      ret.accountPlan = new AccountPlan(); 
      ret.analytical = (it.analytical?Eanalytical.True:Eanalytical.False);
      ret.nature = (EAccPlanNature[EAccPlanNature.Devedora]==it.nature?EAccPlanNature.Devedora:EAccPlanNature.Credora);
      ret.type=(ETypeAccPlan[ETypeAccPlan.Patrimonial]==it.type?ETypeAccPlan.Patrimonial:ETypeAccPlan.Resultado);
      ret.level= it.level;
      ret.name= it.name;
      ret.stucture = it.structure;
      ret.accountPlan.id=it.IdaccountPlan;
      return ret;     
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
    updateOne(keyAccPlan:string,pstructure:string,it:ItemAccountPlan):Observable<string> {
       let sub1:Subject<any>=new Subject();
       let key= this.toKey(pstructure);
       //let ob1=this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan+'/'+key);
       let ob1 = this.oFireObject;
       let subsc= ob1.subscribe({next:ob=>{
           ob1.update(it).then(_=>sub1.next('ok')).catch(err=>sub1.error(err));
        }
              ,error:err=>{sub1.error(err)
         }
            
        });
      return sub1;
    }
    delete(keyAccPlan:string,pstructure:string):Observable<string> {
       let q = {} ; 
       q['query'] ={}; 
       q['query']['orderByChild']='structure';
       q['query']['startAt']=pstructure;
       let sub1:Subject<any>=new Subject();
       let ob1=this.paf.database.list(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan,q); 
       //let ob1=this.oFireList;
       ob1.subscribe({next:(arr)=>{       
       arr.forEach((value:any,index:number)=>{
               if (value.structure.indexOf(pstructure)==0) {
                  ob1.remove(value).then(_=>{
                     sub1.next('removeu');
                  }).catch(err=>sub1.error(err));
               }
       });
       },error:(err)=>sub1.error(err)
       });
      return sub1;
    }
    loadOne(keyAccPlan:string,structure:string):Observable<ItemAccountPlan> {
      let key = this.toKey(structure);
      this.oFireObject =this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan+'/'+key);
      return this.oFireObject as Observable<ItemAccountPlan>;
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
    toNgSelectModel(arr:Array<ItemAccountPlan>):Array<NgSelectModel> {
      let dest:Array<NgSelectModel>=new Array<NgSelectModel>();
      arr.forEach((value) =>{
           if (value.analytical) {
              let x:NgSelectModel = new NgSelectModel();
              x.label = value.name + ' ' + value.structure;
              x.value = value.structure;
              dest.push(x);
           }
      });
      return dest;
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