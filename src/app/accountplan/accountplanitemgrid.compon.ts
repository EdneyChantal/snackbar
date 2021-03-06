import {Component, OnInit,Input,OnChanges,SimpleChanges,EventEmitter,Output } from '@angular/core';
import {PraticaCore} from '../share/pratica-core.service';
import {ItemAccountPlanDaoService} from '../dao/itemaccplan.dao.service';
import {ItemAccountPlan} from '../model/itemaccountplan';
import {NodeTree} from '../model/nodeTree';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {ParamFormInsert} from './ParamFormInsert';
import {NgSelectModel} from '../model/ngSelectModel';


@Component({
  selector: 'cp-accountplan-itemgrid',
  templateUrl: './accountplanitemgrid.compon.html'
})
export class AccountPlanItemGridComponent implements OnInit,OnChanges {
  @Input('keyplan') keyplan:string;
  @Output('doInsert') evdoinsert:EventEmitter<ParamFormInsert>=new EventEmitter<ParamFormInsert>();
  nodes:Array<NodeTree>=new Array<NodeTree>();
  obS:Observable<Array<ItemAccountPlan>>;
  title:string;
  aPlan:Array<ItemAccountPlan>;
  filtro:string="";
  options:Array<NgSelectModel>; 
  form: FormGroup;


  constructor(private pcore:PraticaCore,private itDao:ItemAccountPlanDaoService) { }
  insert(node:any) {
     let param:ParamFormInsert=new ParamFormInsert();
     if (node) {
        param.keyAccountPlan = (this.keyplan.split('$'))[0];
        param.keyFather = node.data.key;
        param.levelFather = node.data.level;
        let px = this.aPlan.filter(value=>{
             return value.structure.indexOf(param.keyFather) == 0 && value.level == (param.levelFather+1);    
        })

        px.sort((a,b)=>{
           let aitA = a.structure.split('.');
           let aitB = b.structure.split('.');

           if (parseInt(aitA[aitA.length-1]) < 
               parseInt(aitB[aitB.length-1])) {
                 return -1 ;
               }
           if (parseInt(aitA[aitA.length-1]) > 
               parseInt(aitB[aitB.length-1])) {
                 return 1 ;
               }
           if (parseInt(aitA[aitA.length-1]) < 
               parseInt(aitB[aitB.length-1])) {
                 return 0 ;
            }
        });
        if (px.length>0) {
            let x= px[px.length-1].structure.split('.');
            param.lastNumberCod = parseInt(x[x.length-1]);
        } else {
           param.lastNumberCod=0;
        }


        this.evdoinsert.emit(param);
     } else {
       // level one 
       param.keyAccountPlan = this.keyplan;
       param.levelFather = 0 ;
       let px = this.aPlan.filter(value=>value.level=1)
       px.sort((a,b)=>{
            if  ( parseInt(a.structure) < parseInt(b.structure) ) {
               return -1 ;
            }
            if  ( parseInt(a.structure) > parseInt(b.structure) ) {
               return 1 ;
            }
            if  ( parseInt(a.structure) == parseInt(b.structure) ) {
               return 0 ;
            }

       });      
       param.lastNumberCod=parseInt(px[px.length-1].structure);
       this.evdoinsert.emit(param);
     }
  }
  update(node:any) {
      let param:ParamFormInsert=new ParamFormInsert();
      param.keyAccountPlan = (this.keyplan.split('$'))[0];
      param.keyFather = node.data.key;
      param.levelFather = node.data.level;
      param.update=true;
      this.evdoinsert.emit(param);

  }
  delete(node:any) {
        let param:ParamFormInsert=new ParamFormInsert();

        param.keyAccountPlan = (this.keyplan.split('$'))[0];
        param.keyFather = node.data.key;
        param.levelFather = node.data.level;
        param.lastNumberCod=0;
       
        this.itDao.delete(param.keyAccountPlan,param.keyFather).subscribe(valor=>{
        },err=>alert(err));




  }
  
  ngOnChanges(changes:SimpleChanges) {
    if (changes['keyplan'].currentValue) {
      let par:string  = changes['keyplan'].currentValue;
      let sep = par.split('$');
      let key = sep[0];
      this.title = sep[1];
      this.obS =  this.itDao.loadAllPlan(key);
      this.obS.subscribe((arr)=>{
         this.aPlan = arr; 
         this.nodes = this.itDao.toTreeNode(arr);
         this.options = this.itDao.toNgSelectModel(arr);
      });
      
   


    }


  }

  ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('selectSingle', new FormControl(''));
        
    }
  
}