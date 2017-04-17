import {SimpleChanges,OnChanges,Component,Input,Output,EventEmitter} from '@angular/core';
import {AccountReceivable} from '../model/accountreceivable';
import {AccountReceivableView} from '../model/accountreceivableV';
import {PortionAccReceivable} from '../model/portionAccReceivable';
import {PortionAccDaoService} from '../dao/portionAcc.dao.service';
import {AccReceivableService} from '../dao/accreceivable.dao.service';
import {PraticaCore} from '../share/pratica-core.service';
import {EventPortAcc} from './EventActPortAcc';

@Component({
  selector: 'cp-portion-acc',
  templateUrl: './portion.acc.component.html'
  
})
export class PortionAccrReComponent implements OnChanges {
  @Input('amountAccountS') amountAccountS:string;
  @Input('allowInclude') allowInclude:Boolean;
  @Input('portionChosen') portionChosen:Array<PortionAccReceivable>;
  @Output('AllowChangeAmount') allowchangeAmount:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  @Output('AllowSave') allowSave:EventEmitter<EventPortAcc>=new EventEmitter<EventPortAcc>();
  @Output('dontSave')  dontSave:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  

  openForm:Boolean=false;
  portionArray=[];
  eventAct:EventPortAcc=new EventPortAcc();
  amountPortion:number=0;
  constructor(private pcore:PraticaCore, private pDao:PortionAccDaoService) { }

  ngOnChanges(changes:SimpleChanges) {
      if (changes['portionChosen'] && changes['portionChosen'].currentValue) {
         
         this.portionArray = changes['portionChosen'].currentValue;
         this.amountPortion = 0 ;
         this.portionArray.forEach(value=>this.amountPortion+=value.value);
         

      }

  }
  procDel(ind){
    
    let e= this.portionArray[ind];
    this.amountPortion -= e.value;
    this.portionArray =  this.portionArray.filter((value,index)=>index!=ind);

    let isBase:boolean=true;
    // look if the portion to delete has been write in the database
    this.eventAct.portToInclude.filter((value,index)=>{
      if (value.id==e.id) {
         isBase=false;
         return false;
      } 
      return true;        
    });
    if (isBase) {
      this.eventAct.portTodelete.push(e.id);
    }
    this.eventAct.portionArray=this.portionArray;

    if (this.portionArray.length === 0) {
       this.allowchangeAmount.emit(true);
    } 
    if (this.amountPortion!=this.pcore.maskToNumber(this.amountAccountS)) {
        this.dontSave.emit(true);
    } else {
      this.dontSave.emit(false);
      this.allowSave.emit(this.eventAct);
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
    this.eventAct.portionArray=this.portionArray;
    this.eventAct.portToInclude=[];
    this.eventAct.portTodelete=[];
    
  }
  include(portion:Object) {
     let t:PortionAccReceivable;
     t = this.pDao.viewToModel(portion);
     t.id= this.pcore.geraId();
     this.amountPortion += (t.value);
     this.portionArray.push(t);
     this.eventAct.portToInclude.push(t);
     this.eventAct.portionArray=this.portionArray;
     this.openForm=false;
     if (this.portionArray.length > 0) {
       this.allowchangeAmount.emit(false);
     } 
     if (this.amountPortion==this.pcore.maskToNumber(this.amountAccountS)) {
       this.dontSave.emit(false);
        this.allowSave.emit(this.eventAct);
        
     }
  


  }

}
