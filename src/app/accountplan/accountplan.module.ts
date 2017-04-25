import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AccountPlanComponent} from './accountplan.component';
import {AccountPlanDaoService} from '../dao/accountplan.dao.service';
import {AccountPlanGridComponent} from './accountplan.grid.compon';
import {ControlPagePipe} from '../share/core/pagePipe';
import {AccountPlanFormComponent} from './accountplan.form.compon';
import { TreeModule } from 'angular-tree-component';
import {AccountPlanItemGridComponent} from './accountplanitemgrid.compon';
import {ItemAccountPlanDaoService} from '../dao/itemaccplan.dao.service';
import {AccountPlanItemFormComponent} from './accountplanitemform.compon';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    TreeModule
  ],
  declarations: [AccountPlanComponent,AccountPlanGridComponent,
                 ControlPagePipe,AccountPlanFormComponent,AccountPlanItemGridComponent,AccountPlanItemFormComponent],
  providers:[AccountPlanDaoService,ItemAccountPlanDaoService]
})
export class AccountPlanModule { }
