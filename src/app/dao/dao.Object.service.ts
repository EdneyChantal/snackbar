import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseObjectObservable} from 'angularfire2';
import {Promise}           from 'firebase';
import {AuthService}       from '../share/auth.service';
import {PraticaCore}       from '../share/pratica-core.service'
import {Subscription}      from 'rxjs/Subscription';
import {Observable}        from 'rxjs'

export class DaoObjService  {
     oobject :FirebaseObjectObservable<any>;
     subscrition:Subscription;
     constructor(private authservice:AuthService,private af:AngularFire,private pcore:PraticaCore){ }
     

     
     closeLoad() {
      this.subscrition.unsubscribe();
     }
     loadGlobalObserv(table:string):Observable<any> {
       if (this.isChosenCompany()) {  
          this.oobject = this.af.database.object(this.authservice.getPathBaseSis()+"/"+table);
          return this.oobject;
       } 

     }
     loadGlobal(table:string ,promise?:Function)  {
       if (this.isChosenCompany()) {  
        this.oobject = this.af.database.object(this.authservice.getPathBaseSis()+"/"+table);
        this.subscrition = this.oobject.subscribe({next:oct=>{
             promise(oct);
        }});
        
       } 
     }
     isChosenCompany():Boolean {
       return (this.authservice.getPathBaseSis()!==null);
     }  
     remove(key:string,promise?:Function,reject?:Function) {
       //this.oobject.set(key,).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));

     }
     updateOne(key:string,pc:Object,promise?:Function,reject?:Function) {
        let ob = {};
        ob[key]= {} ; 
        ob[key]= pc;
        this.oobject.update(ob).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }

     insertOnePromise(pc:Object):Promise<any> {
       let key:string;// this.pcore.geraId();
       if (pc['id']) {
         key=pc['id'];
       } else {
         key=this.pcore.geraId();
         pc['id']= key;
       }
       let ob ={}; 
       ob[key]={};
       ob[key]=this.pcore.prepareModel(pc);
       return this.oobject.update(ob);
     }
     insertOne(pc:Object,promise?:Function,reject?:Function) {
       let key:string;// this.pcore.geraId();
       if (pc['id']) {
         key=pc['id'];
       } else {
         key=this.pcore.geraId();
         pc['id']= key;
       }
       let ob ={}; 
       ob[key]={};
       ob[key]=this.pcore.prepareModel(this.pcore.prepareModel(pc));
       this.oobject.update(ob).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
              //this.olist.push(pc).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }
     

}
