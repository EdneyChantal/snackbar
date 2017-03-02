import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccreceivableComponent} from './accreceivable.component' ;
import {AccReceivableService} from '../dao/accreceivable.dao.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [AccreceivableComponent],
  providers:[AccReceivableService]
})
export class AccreceivableModule { }
