export class ItemSidebarMenu {
   classIcon:string;
   link:string;
   name:string;
   childreen:Array<ItemSidebarMenu>;
   flag:string;
}

export class AppConfig {
  siglaApp: string ;
  refAppRoot:string;
  descriptionSidebar:string;
  pathFigLogo:string;
  itensMenu:ItemSidebarMenu[] 

}
