import { Component, OnInit,Input,Output,EventEmitter}  from '@angular/core';
import {PortionAccReceivable} from '../model/portionAccReceivable';
import {PraticaCore}          from '../share/pratica-core.service'
@Component({
  selector: 'cp-portion-form-acc',
  templateUrl: './portion.acc.form.compon.html',
  styleUrls: []
})
export class PortionAccrFormComponent implements OnInit {
  portionAcc:PortionAccReceivable=new PortionAccReceivable();
  @Output() portionAccChange:EventEmitter<Object>=new EventEmitter<Object>();  
  constructor(private pcore:PraticaCore) { }

  ngOnInit() {
    
  }
  onSubmit() {
     this.portionAccChange.emit(this.portionAcc);
  }

}
