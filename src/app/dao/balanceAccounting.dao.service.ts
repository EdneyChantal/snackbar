import {Injectable}        from '@angular/core';
import {AuthService}       from '../share/auth.service';
import {PraticaCore}       from '../share/pratica-core.service'
import {DaoObjService}     from './dao.Object.service';
import {AngularFire,FirebaseObjectObservable} from 'angularfire2';
import {PortionAccReceivable} from '../model/portionAccReceivable';
import {Observable} from 'rxjs'
import {BalanceAccounting} from '../model/BalanceAccounting';

@Injectable()
export class BalanceAccountingDaoObjService extends DaoObjService  {
   nameTable:string="BalAccountPlan";
   oFireObject:FirebaseObjectObservable<Object>;
   constructor(private pauthservice:AuthService,private paf:AngularFire,private ppcore:PraticaCore){
        super(pauthservice,paf,ppcore);
    }

   loadAll(keyAccPlan:string):Observable<Object> {
      this.oFireObject = this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan);
       return this.oFireObject;
   } 
   loadYear(keyAccPlan:string,year:number):Observable<Object> {
     this.oFireObject = this.paf.database.object(this.pauthservice.getPathBaseSis() + '/' + this.nameTable + '/'+ keyAccPlan+'/'+year);
     return this.oFireObject;
   } 
   genereteSales(pano:number,balacc:Object){
             var yearbase  = (pano-1);
             // exite saldo anterior  
             if (balacc[yearbase]){
                this.ppcore.oForEach(balacc[yearbase],function(value,key){
                    var sales = value[12].finalBalance;
                    if ((!balacc[pano]) || 
                        (!balacc[pano][key])) {
                        if (!balacc[pano]) {
                            balacc[pano] = {} ; 
                        }
                        balacc[pano][key]= {} ;     
                        for (var i=1;i<=12;i++) {
                            balacc[pano][key][i] = new BalanceAccounting();
                            balacc[pano][key][i].finalBalance = sales;
                        }
                    } else {
                       var salesatu = sales;    
                       for (var i=1;i<=12;i++) {
                         if (!balacc[pano][key][i]) {
                             balacc[pano][key][i] = new BalanceAccounting();
                             balacc[pano][key][i].finalBalance=salesatu;
                         } else {
                            
                             salesatu += (balacc[pano][key][i].sumCredits-balacc[pano][key][i].sumDebts);
                             balacc[pano][key][i].finalBalance=salesatu;
                         }     
                       };
                    }
                });
             }
   }
   updateValueBal(accountPlanO:Object,
                  balAccountPO:Object,pmes:number,keyaccount:string,pvalor:number,
                  poperacao:string,pnature:string):string{
              var balAcc = balAccountPO ; 
              var sinal  = 1;
              var oper = 1 ; 
              var mes = pmes ; 
              // identifica se é uma implantação de saldos ou atualização de lançamentos
              var vimpsal = false; 
              // convencao padrão crédito é positivo e débito é negativo             
              // pega os dados da conta analítica
                 
               
              var vaccount = accountPlanO[keyaccount] ; 
              // verifica a natureza da conta 
              if (!vaccount) {
                 return "Chave não retorna uma conta válida " + keyaccount;  
              }
              if (!pnature) {  
                // nesse caso é uma implantação de saldos , pega a natureza da conta 
                mes = 1;
                vimpsal = true;
                if (vaccount.nature === "Devedora") {
                   sinal = -1 ;    
                 }
              } else {
                if (pnature === 'D') {
                   sinal = -1;
                }  
              }
              if (poperacao === 'D') {
                 oper = -1 ;   
              }
              var vvalor = pvalor * sinal ; 
           
              this.ppcore.oForEach(accountPlanO,function(value,key){
                // conta é parente da conta atualizada  
                var ctStruct = key  ;
                if (vaccount.structure.indexOf(value.structure,0) === 0 ) {
                   if (balAcc == undefined) {balAcc = {};}  
                   if (balAcc[ctStruct]== undefined) {balAcc[ctStruct]= {};}    
                   for (var vmes = mes; vmes <= 12 ; vmes++){
                       if (balAcc[ctStruct][vmes] == undefined) {balAcc[ctStruct][vmes] = new BalanceAccounting(); }
                       if ((vmes === mes ) && (!vimpsal)) {
                           if (vvalor >=0 ) {
                              balAcc[ctStruct][vmes].sumCredits += (Math.abs(vvalor) * oper);
                           } else {
                              balAcc[ctStruct][vmes].sumDebts += (Math.abs(vvalor) * oper);
                           }
                       }
                       balAcc[ctStruct][vmes].finalBalance += (vvalor * oper);
                    }
                 }
              });
              return "ok";
    }

}