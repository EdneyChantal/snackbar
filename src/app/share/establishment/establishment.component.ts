import { Component, OnInit } from '@angular/core';
import {PraticaCore} from '../pratica-core.service';
import {AuthService} from '../auth.service';
import {FormControl,FormGroup, FormBuilder,Validators} from '@angular/forms';
import {Establishment} from '../establishment';
import {QuestionBase} from '../dynamicform/model/question-base';
import {DropdownQuestion} from '../dynamicform/model/question-dropdown';
import {TextboxQuestion} from '../dynamicform/model/question-textbox';
import {DateQuestion} from '../dynamicform/model/question-date';


@Component({
  selector: 'cp-establishment',
  templateUrl: './establishment.component.html'
})

export class EstablishmentComponent implements OnInit {
  establishForm:FormGroup;
  establish:Establishment;
  questions: QuestionBase<any>[]=[];
  constructor(private pcore:PraticaCore,
              private ctDao:AuthService,
              private fb:FormBuilder) {
     //this.createForm();             
     this.questions.push(new TextboxQuestion({
       key:'establishName',
       label:'Nome Estabelecimento',
       required:true,
       order:1
     }));
      this.questions.push(new TextboxQuestion({
       key:'address',
       label:'Endereço',
       required:true,
       maxlength:5,
       order:2
     }));
      this.questions.push(new TextboxQuestion({
       key:'cep',
       label:'Cep',
       required:true,
       type:'number',      
       order:3
     }));


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
