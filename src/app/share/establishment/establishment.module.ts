import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule}  from '@angular/platform-browser';
import  {EstablishmentComponent} from './establishment.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  declarations: [EstablishmentComponent],
  providers:[],
  exports:[]
})
export class EstablishmentModule {

 }