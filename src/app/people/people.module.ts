import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PeopleComponent} from  './people.component';
import {PeopleDaoService} from '../dao/people.dao.service';
import {PeopleFormComponent} from './people-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [PeopleComponent, PeopleComponent,PeopleFormComponent],
  providers:[PeopleDaoService]
})
export class PeopleModule { }
