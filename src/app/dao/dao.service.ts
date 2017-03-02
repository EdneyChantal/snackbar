import {Injectable}        from '@angular/core';
import {AngularFire,FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2';
import {Promise}           from 'firebase';
import {Observable}        from 'rxjs/observable';
import {AuthService}       from '../share/auth.service';
import {People}            from '../model/people';
import {PeopleView}        from '../model/peopleview'
import {NgbDateStruct}     from '@ng-bootstrap/ng-bootstrap'
import {PraticaCore}       from '../share/pratica-core.service'
import {Subject}           from 'rxjs/Subject';



export class DaoService  {
     olist :FirebaseListObservable<any>;
     startAtSubject: Subject<any>;
     constructor(private authservice:AuthService,private af:AngularFire,private pcore:PraticaCore){ }
     

     filterBy(value:string) {
        if (this.startAtSubject) {
          this.startAtSubject.next(value);

        }
     }


     loadGlobal(table:string ,promise?:Function,orderkey?:string )  {
       if (this.isChosenCompany()) {  
        let q = {};
        if (orderkey) {
          this.startAtSubject = new Subject();
          q['query'] ={}; 
          q['query']['orderByChild']=orderkey;
          q['query']['startAt']=this.startAtSubject; 
        }
        this.olist = this.af.database.list(this.authservice.getPathBaseSis()+"/"+table,q);
        this.olist.subscribe({next:oct=>{
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

     insert(pc:Object,promise?:Function,reject?:Function) {
       let key = this.pcore.geraId();
       pc['id']= key;
       this.olist.update(key,pc).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
              //this.olist.push(pc).then((a)=>(promise?promise(a):null)).catch((err)=>(reject?reject(err):null));
     }
     

}