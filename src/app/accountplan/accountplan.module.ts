import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AccountPlanComponent} from './accountplan.component';
import {AccountPlanDaoService} from '../dao/accountplan.dao.service';
import {AccountPlanGridComponent} from './accountplan.grid.compon';
import {ControlPagePipe} from '../share/core/pagePipe';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [AccountPlanComponent,AccountPlanGridComponent,ControlPagePipe],
  providers:[AccountPlanDaoService]
})
export class AccountPlanModule { }
