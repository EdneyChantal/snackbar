import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<Date> {
  controlType = 'DateTextBox';
  

  constructor(options: {} = {}) {
    super(options);
  }
}