import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators ,ValidatorFn} from '@angular/forms';

import { QuestionBase } from './model/question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {

      let val:ValidatorFn[]=[];

      if (question.required) {
         val.push(Validators.required);
      }
      if  (question.maxlength != -1 ) {
         val.push(Validators.maxLength(question.maxlength));
      }
      console.log(question.maxlength);
      console.log(val);
      group[question.key] = new FormControl(question.value,val);

     /* group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');*/
    });
    return new FormGroup(group);
  }
}
