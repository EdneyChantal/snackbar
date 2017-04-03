import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2';

import {AuthService}       from '../share/auth.service';
import {People}            from '../model/people';
import {PeopleView}        from '../model/peopleview'
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {Subject}           from 'rxjs/Subject';
import {Subscription}      from 'rxjs/Subscription';
import {Observable}        from 'rxjs'

export class DaoService  {
     olist :FirebaseListObservable<Array<any>>;
     startAtSubject: Subject<any>;
     subscrition:Subscription;
     constructor(private authservice:AuthService,private af:AngularFire,private pcore:PraticaCore){ }
     filterBy(value:string) {
        if (this.startAtSubject) {
          this.startAtSubject.next(value);
        }
     }
     closeLoad() {
      this.subscrition.unsubscribe();
     }
     newSubjectQuery():Subject<any>{
      this.startAtSubject = new Subject();
      return this.startAtSubject;
     }
     loadGlobalObserv(table:string,queryOp?:Object):Observable<any> {
       if (this.isChosenCompany()) {  
          this.olist = this.af.database.list(this.authservice.getPathBaseSis()+"/"+table,queryOp);
          return this.olist;
       } 

     }
     loadGlobal(table:string ,promise?:Function,queryOp?:Object )  {
       if (this.isChosenCompany()) {  
        this.olist = this.af.database.list(this.authservice.getPathBaseSis()+"/"+table,queryOp);
        this.subscrition = this.olist.subscribe({next:oct=>{
             promise(oct);
        }});
        
       } 
     }
     isChosenCompany():Boolean {
       return (this.authservice.getPathBaseSis()!==null);
     }  
     remove(key:string,promise?:Function,reject?:Function) {
       this.olist.remove(key).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));

     }
     update(key:string,pc:Object,promise?:Function,reject?:Function) {
         this.olist.update(key,pc).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }

     insertObservable(pc:Object):Observable<any> {
       let key:string;// this.pcore.geraId();
       if (pc['id']) {
         key=pc['id'];
       } else {
         key=this.pcore.geraId();
         pc['id']= key;
       }


       let oj:Object=this.pcore.prepareModel(pc);
       let ob:Promise<any> =this.olist.update(key,oj) as Promise<any>; 
       return Observable.fromPromise(ob);
     }
     insert(pc:Object,promise?:Function,reject?:Function) {
       let key:string;// this.pcore.geraId();
       if (pc['id']) {
         key=pc['id'];
       } else {
         key=this.pcore.geraId();
         pc['id']= key;
       }
       let oj:Object=this.pcore.prepareModel(pc);
       this.olist.update(key,oj).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
              //this.olist.push(pc).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }
     

}
