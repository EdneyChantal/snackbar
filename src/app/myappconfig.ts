import { OpaqueToken } from '@angular/core';
import {AppConfig,ItemSidebarMenu} from './share/app-config'


const item1:ItemSidebarMenu={classIcon:'fa-male',
                             link:'/menu/people',
                             name:'Clientes'};
const item2:ItemSidebarMenu={classIcon:'fa-money',
                             link:'/menu/accreceivable',
                             name:'Contas a Receber'};
const item3:ItemSidebarMenu={classIcon:'fa-blind',
                             link:'/menu/portaria',
                             name:'Portaria'};
                             



export const snackbarConfig: AppConfig = {
  siglaApp:'LUFA',
  refAppRoot:'BaseCompanys',
  descriptionSidebar:'Gestão de Restaurante',
  pathFigLogo:'assets/img/logo-onguardsystem.png',
  itensMenu:[item1,item2]
};

//export let APP_CONFIG = new OpaqueToken('app.config');

//export class AppConfig implements AppConfig {}  