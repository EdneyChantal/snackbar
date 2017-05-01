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
import {AccountPlanItemFormComponent} from './accountplanitemform.compon';
import {ItemAccountPlanDaoService} from '../dao/itemaccplan.dao.service';
import {SelectModule} from 'ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    TreeModule ,
    SelectModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  declarations: [AccountPlanComponent,AccountPlanGridComponent,
                 ControlPagePipe,AccountPlanFormComponent,AccountPlanItemGridComponent,AccountPlanItemFormComponent],
  providers:[AccountPlanDaoService,ItemAccountPlanDaoService],
  exports:[AccountPlanItemGridComponent]
})
export class AccountPlanModule { }
