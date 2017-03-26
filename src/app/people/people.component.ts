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
  openForm:Boolean=false;
  erro:string='';
  selectPeople:People;
  keySelect:string;
  
  constructor(private ctDao:PeopleDaoService,private pcore:PraticaCore) { }

  ngOnInit() {
   
  }
  choosePeople(people:People ) {
   this.selectPeople = people;
   this.keySelect = people.id;
   this.openForm = true;

  }
  toogleForm() {
    if (!this.openForm) {
       this.selectPeople= undefined;
       this.keySelect= undefined;
    }
    this.openForm = !this.openForm;
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
