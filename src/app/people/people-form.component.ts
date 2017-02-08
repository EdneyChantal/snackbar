import { Component, OnInit } from '@angular/core';
import {People} from '../model/people';

@Component({
  selector: 'cp-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: []
})
export class PeopleFormComponent implements OnInit {
  people:People = new People();

  ngOnInit() {
  }

}
