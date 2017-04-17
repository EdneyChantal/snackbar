import { OpaqueToken } from '@angular/core';
import {AppConfig,ItemSidebarMenu} from './share/app-config';


const item1:ItemSidebarMenu={classIcon:'fa-male',
                             link:'/menu/people',
                             name:'Clientes',
                             childreen:[],
                             flag:''};
const item2:ItemSidebarMenu={classIcon:'fa-money',
                             link:'/menu/accreceivable',
                             name:'Contas a Receber',
                             childreen:[],
                             flag:''};
const item3:ItemSidebarMenu={classIcon:'fa-list-ol',
                             link:'/menu/accountplan',
                             name:'Plano de Contas',
                             childreen:[],
                             flag:''};
const itemPlan:ItemSidebarMenu={classIcon:'fa-bar-chart',
                             link:'',
                             name:'Contabilidade',
                             childreen:[item3],
                             flag:'Plan'};
const itemFinan:ItemSidebarMenu={classIcon:'fa-money',
                             link:'',
                             name:'Financeiro',
                             childreen:[item1,item2],
                             flag:'Finan'};                             



export const snackbarConfig: AppConfig = {
  siglaApp:'LUFA',
  refAppRoot:'BaseCompanys',
  descriptionSidebar:'Gestão de Restaurante',
  pathFigLogo:'assets/img/logo-onguardsystem.png',
  itensMenu:[itemFinan,itemPlan]
};

//export let APP_CONFIG = new OpaqueToken('app.config');

//export class AppConfig implements AppConfig {}  