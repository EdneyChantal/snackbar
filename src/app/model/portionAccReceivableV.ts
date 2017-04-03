import {AccountReceivable} from './accountreceivable';
import {NgbDateStruct} from  '@ng-bootstrap/ng-bootstrap';

export class PortionAccReceivableView {
   id:string;
   AccReceivable:AccountReceivable;
   value:string;
   maturityDate:NgbDateStruct;
}