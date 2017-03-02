import { SimpleChanges,Component,OnChanges, OnInit,Output,Input,EventEmitter } from '@angular/core';
import {PeopleView} from '../model/peopleview';
import {PraticaCore}   from  '../share/pratica-core.service';

@Component({
  selector: 'cp-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: []
})
export class PeopleFormComponent implements OnInit,OnChanges {
  @Output() peopleChange:EventEmitter<PeopleView>=new EventEmitter<PeopleView>();
  @Input('changePeople')  chPe:PeopleView;
  people:PeopleView = new PeopleView();

  constructor(private pcore:PraticaCore) {
    
  }
  findCep() {
    
    let ncep= this.pcore.maskToNumber(this.people.cep);
    this.pcore.findCep(ncep,response=>{
       this.people.bairro = response.bairro ; 
       this.people.cidade = response.localidade; 
       this.people.endereco = response.logradouro; 
       this.people.estado  = response.uf ; 
    });
  }
  onSubmit() {
      this.peopleChange.emit(this.people);
      this.people= new PeopleView();
  }
  ngOnChanges(changes:SimpleChanges) {
    
    this.people = (changes['chPe'].currentValue?changes['chPe'].currentValue:this.people);
  }

  ngOnInit() {
     /*this.people.typePeople="FI";
     if (this.chPe) {
        this.people = this.chPe;
     }*/
  }

}
