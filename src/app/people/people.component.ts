import { Component, OnInit } from '@angular/core';
import {PeopleDaoService}  from '../dao/people.dao.service';
import {People} from '../model/people';
import {PeopleView} from '../model/peopleview';

@Component({
  selector: 'cp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  lct:People[];
  openForm:Boolean=false;
  erro:string='';

  constructor(private ctDao:PeopleDaoService) { }

  ngOnInit() {
      this.ctDao.load(obj=>{
        this.lct=(obj as People[]);
      });


  }
  toogleForm() {
    this.openForm = !this.openForm;

  }
  save(pv:PeopleView){
    debugger;
    let nct:People=new People();
    this.ctDao.viewToModel(nct,pv);
    /*if (this.selectCt) {
       
       this.ctDao.updateContract(this.keySelect, nct,()=>{this.toogleForm()
         },(err)=>this.erro=err);
    } else {*/
       //this.ctDao.viewToModel(nct,value);
       this.ctDao.insert( nct,()=>{this.toogleForm()
         },(err)=>this.erro=err);
    /*}
    this.selectCt = undefined;
    this.keySelect = undefined;*/


  }

}
