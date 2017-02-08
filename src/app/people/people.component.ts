import { Component, OnInit } from '@angular/core';
import {PeopleDaoService}  from '../dao/people.dao.service';
import {People} from '../model/people';

@Component({
  selector: 'cp-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  lct:People[];
  openForm:Boolean=false;
  constructor(private ctDao:PeopleDaoService) { }

  ngOnInit() {
      this.ctDao.load(obj=>{
        this.lct=(obj as People[]);
      });


  }
  toogleForm() {
    this.openForm = !this.openForm;

  }

}
