import { Component, OnInit,Input,OnChanges,SimpleChanges } from '@angular/core';
import {PortionAccReceivable} from '../model/portionAccReceivable';


@Component({
  selector: 'cp-portion-grid-acc',
  templateUrl: './portion.acc.grid.compon.html'
  
})
export class PortionAccrGridComponent implements OnChanges {
  @Input('arrayPortion') arrayPortion:Array<PortionAccReceivable>;
  
  
  constructor() { }

  ngOnChanges(changes:SimpleChanges) {
    //console.log(changes['arrayPortion'].currentValue);
    //if (changes['arrayPortion'].currentValue) {
      //this.people = this.ctDao.modelToView(changes['chPe'].currentValue);
    //}
  }
  
  

}
