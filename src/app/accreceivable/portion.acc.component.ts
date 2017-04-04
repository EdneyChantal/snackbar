import {SimpleChanges,OnChanges,Component,Input,Output,EventEmitter} from '@angular/core';
import {AccountReceivable} from '../model/accountreceivable';
import {AccountReceivableView} from '../model/accountreceivableV';
import {PortionAccReceivable} from '../model/portionAccReceivable';
import {PortionAccDaoService} from '../dao/portionAcc.dao.service';
import {AccReceivableService} from '../dao/accreceivable.dao.service';
import {PraticaCore} from '../share/pratica-core.service';

@Component({
  selector: 'cp-portion-acc',
  templateUrl: './portion.acc.component.html'
  
})
export class PortionAccrReComponent implements OnChanges {
  @Input('amountAccountS') amountAccountS:string;
  @Input('allowInclude') allowInclude:Boolean;
  @Input('portionChosen') portionChosen:Array<PortionAccReceivable>;
  @Output('AllowChangeAmount') allowchangeAmount:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  @Output('AllowSave') allowSave:EventEmitter<Array<PortionAccReceivable>>=new EventEmitter<Array<PortionAccReceivable>>();
  @Output('dontSave')  dontSave:EventEmitter<Boolean>=new EventEmitter<Boolean>();

  openForm:Boolean=false;
  portionArray:Array<PortionAccReceivable>=new Array<PortionAccReceivable>();
  amountPortion:number=0;
  constructor(private pcore:PraticaCore, private pDao:PortionAccDaoService) { }

  ngOnChanges(changes:SimpleChanges) {
      if (changes['portionChosen'] && changes['portionChosen'].currentValue) {
         this.portionArray = changes['portionChosen'].currentValue;
         this.amountPortion = 0 ;
         this.portionArray.forEach(value=>this.amountPortion+=value.value);
         this.allowSave.emit(this.portionArray);

      }

  }
  procDel(ind){
    debugger
    let e= this.portionArray[ind];
    this.amountPortion -= e.value;
    this.portionArray.splice(ind,1);
    if (this.portionArray.length = 0) {
       this.allowchangeAmount.emit(true);
    } 
    if (this.amountPortion!=this.pcore.maskToNumber(this.amountAccountS)) {
        this.dontSave.emit(true);
    }
  }

  toogleForm() {
    if (!this.openForm && (this.amountPortion < this.pcore.maskToNumber(this.amountAccountS))) {
        this.openForm = !this.openForm; 
    } else if (this.openForm ) {
         this.openForm = !this.openForm; 
    }
      
  }
  ngOnInit() {
    
  }
  include(portion:Object) {
     let t:PortionAccReceivable;
     t = this.pDao.viewToModel(portion);
     this.amountPortion += (t.value);
     this.portionArray.push(t);
     this.openForm=false;
     if (this.portionArray.length > 0) {
       this.allowchangeAmount.emit(false);
     } 
     if (this.amountPortion==this.pcore.maskToNumber(this.amountAccountS)) {
       this.dontSave.emit(false);
        this.allowSave.emit(this.portionArray);
     }



  }

}
