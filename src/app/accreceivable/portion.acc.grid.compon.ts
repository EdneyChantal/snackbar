import { Component, OnInit,Input,OnChanges,SimpleChanges,Output,EventEmitter} from '@angular/core';
import {PortionAccReceivable} from '../model/portionAccReceivable';


@Component({
  selector: 'cp-portion-grid-acc',
  templateUrl: './portion.acc.grid.compon.html'
  
})
export class PortionAccrGridComponent implements OnChanges {
  @Input('arrayPortion') arrayPortion:Array<PortionAccReceivable>;
  @Output('deleteAct') evDoDelete:EventEmitter<number>=new EventEmitter<number>();
  
  constructor() { }

  doDelete(i:number) {
    this.evDoDelete.emit(i);
  }
  ngOnChanges(changes:SimpleChanges) {
    console.log(changes['arrayPortion']);
    //if (changes['arrayPortion'].currentValue) {
      //this.people = this.ctDao.modelToView(changes['chPe'].currentValue);
    //}
  }
  
  

}
