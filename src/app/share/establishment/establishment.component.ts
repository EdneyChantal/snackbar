import { Component, OnInit } from '@angular/core';
import {PraticaCore} from '../pratica-core.service';
import {AuthService} from '../auth.service';
import {FormControl,FormGroup, FormBuilder,Validators} from '@angular/forms';
import {Establishment} from '../establishment';



@Component({
  selector: 'cp-establishment',
  templateUrl: './establishment.component.html'
})

export class EstablishmentComponent implements OnInit {
  establishForm:FormGroup;
  establish:Establishment;
  constructor(private pcore:PraticaCore,
              private ctDao:AuthService,
              private fb:FormBuilder) {
     this.createForm();             

  }

  createForm() {
    this.establishForm = this.fb.group({
      establishName:['',Validators.required,Validators.maxLength(50)],
      id:'',
      address:['',Validators.required,Validators.maxLength(100)],
      cep:0 ,
      cnpj:['',Validators.required],
      dateendwork:new Date(),
      datestartwork:new Date(),
      yearwork:0
    });


  }
  ngOnInit() {

   
   

    
  }
  
}
