import { Component, OnInit } from '@angular/core';
import {PeopleDaoService}  from '../dao/people.dao.service';
import {People} from '../model/people';
import {PeopleView} from '../model/peopleview';
import {PraticaCore} from '../share/pratica-core.service';

@Component({
  selector: 'cp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  lct:People[]=new Array<People>();
  lctView:People[]=new Array<People>();
  openForm:Boolean=false;
  erro:string='';
  selectPeople:PeopleView;
  keySelect:string;
  page:number=1;
  reSearch:string='';

  constructor(private ctDao:PeopleDaoService,private pcore:PraticaCore) { }

  ngOnInit() {
      this.ctDao.load(obj=>{
        this.lct=(obj as People[]);
        this.pageTable();
      });


  }
  pageTable(){
     this.lctView = (this.pcore.controlArrayPage(this.lct,this.page) as People[]);
  }
  toogleForm() {
    if (!this.openForm) {
       this.selectPeople= undefined;
       this.keySelect= undefined;
    }
    this.openForm = !this.openForm;
    

  }
  remove(key){
    this.ctDao.remove(key);
  }
  choicePe(sel){
    this.selectPeople =this.ctDao.modelToView(sel);
    this.keySelect = sel.id;
    this.openForm=true;
  }
  doSearch(pes){
    this.reSearch = pes;
    this.page=1;
    this.ctDao.filterBy(pes);
  }
  save(pv:PeopleView){
    let nct= {};
    nct = this.ctDao.viewToModel(pv);
    if (this.selectPeople) {
       this.ctDao.update(this.keySelect, nct,()=>{this.toogleForm()
         },(err)=>this.erro=err);
       this.selectPeople = undefined;
       this.keySelect = undefined;
    } else {
       this.ctDao.insert( nct,()=>{this.toogleForm()
         },(err)=>this.erro=err);
    }
  }

}
