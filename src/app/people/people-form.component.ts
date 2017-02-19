import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {PeopleView} from '../model/peopleview';
import {PraticaCore}   from  '../share/pratica-core.service';

@Component({
  selector: 'cp-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: []
})
export class PeopleFormComponent implements OnInit {
  @Output() peopleChange:EventEmitter<PeopleView>=new EventEmitter<PeopleView>();
  people:PeopleView = new PeopleView();

  constructor(private pcore:PraticaCore) {
    
  }
  onSubmit() {
      this.peopleChange.emit(this.people);
      this.people= new PeopleView();
      
   }

  ngOnInit() {
     this.people.typePeople="FI";
  }

}
