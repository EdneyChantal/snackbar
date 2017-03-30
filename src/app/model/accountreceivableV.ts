import {People} from './people';
import {NgbDateStruct} from  '@ng-bootstrap/ng-bootstrap';

export class AccountReceivableView {
   id:string;
   people:People;
   idDocument:string;
   namePeople:string;
   amount:string;
   finanFine:string;
   interrestDay:string;
   description:string;
   dataReg:NgbDateStruct;
}