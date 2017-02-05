import { Component, OnInit } from '@angular/core';
import { Login  }      from "../login";
import {AuthService}              from '../auth.service'; 
import {Router}   from '@angular/router';
import {NgForm,NgModel} from '@angular/forms';

@Component({
    selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] ,
})
export class LoginComponent implements OnInit {
  login :Login;
  canDisplay:boolean;
  constructor(private authservice:AuthService,private router:Router) { 
  }
  mLogin(){
    this.canDisplay= true;
     this.authservice.login(this.login.name,this.login.password,()=>{
       this.canDisplay=false;
       this.router.navigate(['/menu']);
      },()=>this.canDisplay=false);
  }
  ngOnInit() {
    this.login = new Login('','','');
    this.canDisplay=false;
  }

}
