import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {AccountReceivable} from '../model/accountreceivable';
import {AccReceivableService} from '../dao/accreceivable.dao.service'; 
import {PortionAccDaoService}  from '../dao/portionAcc.dao.service';
import {PraticaCore} from '../share/pratica-core.service';

@Component({
  selector: 'cp-accreceivable-grid',
  templateUrl: './accreceivable.grid.compon.html'
})
export class AccreceivableGridComponent implements OnInit {
  @Output('chosenAccount') evChosenAcc:EventEmitter<AccountReceivable> =new EventEmitter<AccountReceivable>(); 
  
  lct:AccountReceivable[]=new Array<AccountReceivable>();
  lctV:AccountReceivable[]=new Array<AccountReceivable>();
  reSearch:string='';
  page:number=1;
  constructor(private accDao:AccReceivableService, private porDao:PortionAccDaoService,private pcore:PraticaCore) { }

  pageTable(){
     this.lctV = (this.pcore.controlArrayPage(this.lct,this.page) as AccountReceivable[]);
  }
  chosenAcc(ac:AccountReceivable) {
     this.evChosenAcc.emit(ac);
  }
  ngOnInit() {
     this.accDao.load(obj=>{
        this.lct=(obj as AccountReceivable[]);
        this.pageTable();
      });
     this.porDao.load(_=>{});
  }
  
   doSearch(pes){
    this.reSearch = pes;
    this.page=1;
    this.accDao.filterBy(pes);
   } 
}
