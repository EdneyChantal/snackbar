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
  @Output('AllowChangeAmount') allowchangeAmount:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  openForm:Boolean=false;
  portionArray:Array<PortionAccReceivable>=new Array();
  amountPortion:number=0;
  constructor(private pcore:PraticaCore, private pDao:PortionAccDaoService) { }

  ngOnChanges(changes:SimpleChanges) {


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
  }

}
