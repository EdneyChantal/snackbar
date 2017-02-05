import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule }    from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoadingModule} from '../loading/loading.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    LoadingModule
  ],
  declarations: [LoginComponent],
  exports:[LoginComponent]
})
export class LoginModule { }
