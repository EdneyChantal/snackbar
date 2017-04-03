import { Component, OnInit,Input,Output,EventEmitter}  from '@angular/core';
import {PortionAccReceivableView} from '../model/portionAccReceivableV';
import {PraticaCore}          from '../share/pratica-core.service';
@Component({
  selector: 'cp-portion-form-acc',
  templateUrl: './portion.acc.form.compon.html'
  
})
export class PortionAccrFormComponent implements OnInit {
  @Input('amountAccount') amountAccount:string;
  @Input('amountPortion') amountPortion:number;
  error:String="";
  portionAcc:PortionAccReceivableView=new PortionAccReceivableView();
  @Output() portionAccChange:EventEmitter<Object>=new EventEmitter<Object>();  
  constructor(private pcore:PraticaCore) { }

  ngOnInit() {
    //debugger;
  }
  onSubmit() {
     // the amount of the portion never greater than the  value of account
     if ( (this.pcore.maskToNumber(this.portionAcc.value) + this.amountPortion) >
        this.pcore.maskToNumber(this.amountAccount) ) {
        this.error="Soma das parcelas maior que o valor da conta";

      } else {
        this.portionAccChange.emit(this.portionAcc);
      }  
  }

}
