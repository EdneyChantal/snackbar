import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { NgModule }                     from '@angular/core';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';
import {DynamicFormComponent} from './dynamic-form.component';
import {NgbModule}     from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from 'angular2-material-datepicker';

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule,NgbModule,DatepickerModule  ],
  declarations: [DynamicFormComponent,DynamicFormQuestionComponent],
  exports:[DynamicFormComponent]

})
export class DynamicQuestionModule {



}