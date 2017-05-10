import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule}  from '@angular/platform-browser';
import  {EstablishmentComponent} from './establishment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule}     from '@ng-bootstrap/ng-bootstrap';
import {DynamicQuestionModule} from '../dynamicform/dynamic-question.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    DynamicQuestionModule],
  declarations: [EstablishmentComponent],
  providers:[],
  exports:[]
})
export class EstablishmentModule {

 }