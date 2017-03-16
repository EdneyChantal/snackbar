import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccreceivableComponent} from './accreceivable.component' ;
import {AccReceivableService} from '../dao/accreceivable.dao.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SelectModule}  from 'ng2-select';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SelectModule,
  ],
  declarations: [AccreceivableComponent],
  providers:[AccReceivableService]
})
export class AccreceivableModule { }
