export class User {
  constructor( public firstName: string,
               public lastName:string,
               public cpf:number,
               public perfil:string,
               public email:string,
               public status:string,
               public uid:string,
               public companys: Object ) {
  }
}