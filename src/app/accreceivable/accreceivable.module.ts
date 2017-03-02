import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccreceivableComponent} from './accreceivable.component' ;
import {AccReceivableService} from '../dao/accreceivable.dao.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccreceivableComponent],
  providers:[AccReceivableService]
})
export class AccreceivableModule { }
