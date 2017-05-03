import {Injectable,Inject } from '@angular/core';
import {AngularFire,FirebaseAuthState,FirebaseObjectObservable,AngularFireAuth,FirebaseListObservable} from 'angularfire2';
import {Promise} from 'firebase';
import {User}       from './user'
import {Company}       from './company'
import {Establishment} from './establishment'

import {Router} from '@angular/router';
import {AppConfig} from './app-config' 
import {PraticaCore}  from './pratica-core.service'

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  display:boolean=false;
  lastErr: String;
  user : User;
  companys :Company[];
  chosenCompany:Company;
  chosenEstablish:Establishment;
  siglaApp:string;
  establishments:Establishment[];

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  

  constructor(private af:AngularFire,private router:Router,  @Inject('APP_CONFIG') private config: AppConfig,private pcore: PraticaCore ) {
     let actionOk:Function  = function(puser:User,pthis:AuthService) {
           if (puser) {
                   pthis.user = puser;
                   pthis.isLoggedIn = true;
                   router.navigate(['/menu']);
                }
            pthis.display=false;    
      }
      this.display=true
      this.af.auth.subscribe({next:auth =>{
        if (auth!=null) {
           this.getUserbyUid(auth.uid,login => {
              this.getUser(login).subscribe({next:user=>this.getCompanysUser(user,actionOk),
                                          error:err=>this.display=false});
           },()=>{this.display=false;});
        } else {
          this.display=false;
        }
        
      },error:err=>{
        this.display=false;
      }});
    
  }
  getPathBaseSis():string {
    if (this.chosenCompany && this.chosenEstablish) {
        return this.config.refAppRoot + '/' + this.chosenCompany['$key'] + '/' + this.chosenEstablish['$key'];
    } 
    return null;    
  }
  chooseEstablish(pEstablish) {
    this.chosenEstablish = pEstablish;
  }
  isChosenCompany():Boolean {
       return (this.getPathBaseSis()!==null);
     }  
  chooseCompany(pCompany,promise?:Function) {
    this.display= true 
    this.chosenCompany = pCompany;
    this.af.database.object('Establishments/'+pCompany.$key).subscribe({next:obj=>{
        this.establishments=(this.pcore.toArray(obj) as Establishment[]);    
        if (promise){
          promise();
        }
        this.display= false;
    },error:err=>this.display=false});
  }
  private getUserbyUid(puid:string,promise:Function,ferr?:Function){
     let pr : FirebaseObjectObservable<Object>;
     pr = this.af.database.object('UserLogin');
     pr.subscribe({next:obj=>promise(obj[puid]),error:err=>ferr(err)});
  }
  private getUser(username:string):FirebaseObjectObservable<User>  {
    return this.af.database.object('Users/'+username);
  }
  private filterCompanySys(oCompanys:Company[],siglaApp:string):Company[] {
        let b:Company[]=[];

        for (let company of oCompanys) {
            if (company.System[siglaApp]){
                b.push(company);
            }         
        } 
        return b;
  }
  private getCompanysUser(puser:User,promise:Function,ferr?:Function) {
    let findCompanys: Function  = function(pcompanys:Object,pcompUser:string[],pauthsh:AuthService) {
        let gCompy:Company[]=[];
        pcompUser.map(keycomp=>{
          pcompanys[keycomp]['$key'] =keycomp;
          gCompy.push(pcompanys[keycomp]);
          } );

        return pauthsh.filterCompanySys(gCompy,pauthsh.config.siglaApp);
    }
    this.af.database.object('Companys').subscribe({next:companys=>{
         this.companys = findCompanys(companys as Company[],puser.companys as string[],this);  
         promise(puser,this);
    },error:err=>{
     if (ferr){
       ferr(err);
      }
    }});
  }
  private verLoginBase(puser:User,passw:string ):Promise<User> {
      if (puser.firstName) {
        return  this.af.auth.login({email:puser.email,password:passw}).then(a=>{
               this.user = puser;  
               this.isLoggedIn = true;
               return puser; }).catch(err=>{
                this.lastErr=err.message;
                return Promise.reject(err);
              });
      } else {
         this.lastErr="Login não encontrado";
         return Promise.reject(new Error('Login não encontrado'));
      }
  }
  login(username:string , passw: string ,fsubscribe: Function, fsubscErr?:Function) {
    this.lastErr = null;
    this.display = true;
    this.getUser(username).subscribe(user=>{
       this.verLoginBase(user,passw).then(us=>{
          this.getCompanysUser(us,()=>{
            if (fsubscribe) {
               fsubscribe();
             };
             this.display=false;
          },(err)=>{
            if (fsubscErr){
              fsubscErr();
            } 
            this.display=false;
          });        
       }).catch(err=>{
           if (fsubscErr){
             fsubscErr();
           }
           this.display=false;
       });
    });
  }
  
  logout(): void {
    this.isLoggedIn = false;
    this.af.auth.logout();
  }
}
