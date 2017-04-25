import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {AccountPlanDaoService} from '../dao/accountplan.dao.service';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {ParamFormInsert}  from './ParamFormInsert';



@Component({
  selector: 'cp-accountplan',
  templateUrl: './accountplan.component.html'
})
export class AccountPlanComponent implements OnInit {
  toogleFplan:boolean=false;
  keyChosenUpdate:string;
  keyShowPlan:string;
  openFormItem:boolean=false;
  paramInsert:ParamFormInsert;
  constructor(private pcore:PraticaCore,
              private ctDao:AccountPlanDaoService,
              overlay:Overlay,
              vcRef:ViewContainerRef,
              public modal:Modal
             ) { 
    overlay.defaultViewContainer=vcRef;               
    
  }

  
  ngOnInit() {

    /*this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('A simple Alert style modal window')
        .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
        .open();*/

    
  }
  
}
