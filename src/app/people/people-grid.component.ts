import {SimpleChanges,Component,OnChanges, OnInit,Output,Input,EventEmitter} from '@angular/core';
import {PeopleView} from '../model/peopleview';
import {People} from '../model/people';
import {PeopleDaoService}  from '../dao/people.dao.service';
import {PraticaCore}   from  '../share/pratica-core.service';

@Component({
  selector: 'cp-grid-people',
  templateUrl: './people-grid.component.html'
  
})
export class PeopleGridComponent implements OnInit {
   @Output() peopleChoose:EventEmitter<People>=new EventEmitter<People>();
   @Input('showActs') showActs:boolean;
   
   lct:People[]=new Array<People>();
   lctView:People[]=new Array<People>();
   reSearch:string='';
   page:number=1;
   selectPeople:People;
   keySelect:string;
   ngOnInit() {
       this.ctDao.load(obj=>{
        this.lct=(obj as People[]);
        this.pageTable();
      });
   }
   constructor(private ctDao:PeopleDaoService,private pcore:PraticaCore) { }

   pageTable(){
     this.lctView = (this.pcore.controlArrayPage(this.lct,this.page) as People[]);
   }
   choicePe(sel:People){
    this.selectPeople =sel
    this.keySelect = sel.id;
    this.peopleChoose.emit(this.selectPeople);
  }

   doSearch(pes){
    this.reSearch = pes;
    this.page=1;
    this.ctDao.filterBy(pes);
  }
}