import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PortionAccrReComponent} from  './portion.acc.component';
import {PortionAccrFormComponent} from  './portion.acc.form.compon';
import {PortionAccrGridComponent} from  './portion.acc.grid.compon';
import {NgbModule}     from '@ng-bootstrap/ng-bootstrap';
import {PortionAccDaoService} from '../dao/portionAcc.dao.service'


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  declarations: [PortionAccrFormComponent,PortionAccrGridComponent,PortionAccrReComponent],
  providers:[PortionAccDaoService],
  exports:[PortionAccrReComponent]
})
export class PortionAccRecModule { 


}
