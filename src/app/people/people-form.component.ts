import { SimpleChanges,Component,OnChanges, OnInit,Output,Input,EventEmitter } from '@angular/core';
import {PeopleView} from '../model/peopleview';
import {People }    from '../model/people';
import {PraticaCore}   from  '../share/pratica-core.service';
import {PeopleDaoService} from '../dao/people.dao.service';

@Component({
  selector: 'cp-people-form',
  templateUrl: './people-form.component.html'
  
})
export class PeopleFormComponent implements OnInit,OnChanges {
  @Output() peopleChange:EventEmitter<PeopleView>=new EventEmitter<PeopleView>();
  @Input('changePeople')  chPe:People;
  people:PeopleView = new PeopleView();

  constructor(private pcore:PraticaCore,private ctDao:PeopleDaoService) {
    
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
    if (changes['chPe'].currentValue) {
      this.people = this.ctDao.modelToView(changes['chPe'].currentValue);
    }
  }

  ngOnInit() {
     /*this.people.typePeople="FI";
     if (this.chPe) {
        this.people = this.chPe;
     }*/
  }

}
