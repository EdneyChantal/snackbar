import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AccreceivableComponent} from './accreceivable.component' ;
import {AccreceivableFormComponent}  from './accreceivable.form.component';
import {AccreceivableGridComponent}  from './accreceivable.grid.compon';
import {AccReceivableService} from '../dao/accreceivable.dao.service';
import {PortionAccDaoService}  from '../dao/portionAcc.dao.service' ;
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ComboBoxModule} from 'ng2-combobox';
import {PeopleModule} from '../people/people.module';

import {PortionAccRecModule} from './portion.acc.module';
import {PortionAccDaoObjService} from '../dao/portionAcc.daoObj.service'
import {PeopleDaoService} from '../dao/people.dao.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ComboBoxModule,
    PeopleModule,
    PortionAccRecModule
  ],
  declarations: [AccreceivableComponent,AccreceivableFormComponent,AccreceivableGridComponent],
  providers:[AccReceivableService,PortionAccDaoService,PortionAccDaoObjService,PeopleDaoService]
})
export class AccreceivableModule { }
