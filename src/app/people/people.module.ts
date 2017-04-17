import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PeopleComponent} from  './people.component';
import {PeopleDaoService} from '../dao/people.dao.service';
import {PeopleFormComponent} from './people-form.component';
import {PeopleGridComponent} from './people-grid.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TreeModule
  ],
  declarations: [PeopleComponent,PeopleFormComponent,PeopleGridComponent],
  providers:[PeopleDaoService],
  exports:[PeopleGridComponent]

})
export class PeopleModule { }
