import { Pipe, PipeTransform } from '@angular/core';
import {PraticaCore}  from '../pratica-core.service';
import {ParamPagePipe } from './paramPagePipe';


@Pipe({ name: 'controlPage' })
export class ControlPagePipe implements PipeTransform {
 
  constructor(private pcore:PraticaCore) {}

  transform(arrayAll: Array<any>,param:ParamPagePipe):Array<any> {
      return this.pcore.controlArrayPage(arrayAll,param.page,param.pageLength);
  }
}
