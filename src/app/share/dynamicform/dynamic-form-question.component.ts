import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from './model/question-base';

@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return (this.form.controls[this.question.key].errors['required'] || this.form.controls[this.question.key].pristine); }
  isPristine():boolean {
     return this.form.controls[this.question.key].pristine;
  }
  chooseDate(val){
    let alt:{}={};
    alt[this.question.key]=val;
    this.form.patchValue(alt);
    this.form.controls[this.question.key].updateValueAndValidity();
  }
  error(type:string):boolean{
    if ((this.form.controls[this.question.key].errors) &&
        (this.form.controls[this.question.key].errors[type])) {
      return true;
    }
    return false;

  }


}

