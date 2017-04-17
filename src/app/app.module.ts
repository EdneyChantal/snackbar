// common in all application

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule,AuthProviders,AuthMethods } from 'angularfire2';
import { AppRoutingModule }  from './share/app-routing.module';
import { AuthService } from './share/auth.service';
import { AppComponent } from './app.component';
import {PeopleModule}  from './people/people.module';

//common in core pratica.com
import {PraticaCore}  from  './share/pratica-core.service'
import {LoginModule} from './share/login/login.module';
import {MenuModule} from './share/menu/menu.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {snackbarConfig} from './myappconfig';
import {AccreceivableModule} from './accreceivable/accreceivable.module';
import {PortionAccRecModule} from './accreceivable/portion.acc.module';
import {AccountPlanModule} from './accountplan/accountplan.module';


// Must export the config
const firebaseConfig = {
  apiKey: "AIzaSyCORKDPWChZ4iWsKc9DO83kMe0MLTdUPSk",
         authDomain: "lucrofacil.firebaseapp.com",
         databaseURL: "https://lucrofacil.firebaseio.com",
        storageBucket: "project-2438716610560293642.appspot.com",
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MenuModule,
    HttpModule,
    LoginModule,
    AppRoutingModule,
    PeopleModule ,
    AccreceivableModule,
    PortionAccRecModule,
    AccountPlanModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
    NgbModule.forRoot()
  ],
  providers: [PraticaCore,{provide:'APP_CONFIG',useValue:snackbarConfig},AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
