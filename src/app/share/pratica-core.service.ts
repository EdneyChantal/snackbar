import { Injectable} from '@angular/core';


@Injectable()
export class PraticaCore {
    constructor() {}
    maskToNumber(str:string ) :number {
        if (str) {
           return parseInt( str.replace(/[\D]+/g,'') );
        }
        return null;   
    }

    controlArrayPage(arrTotal:Array<Object>,page:number=1,lengthPage:number=10) {
       let arrPage = new Array<Object>();
       let indexini:number;
       let indexfim:number;
       let lenTotal = arrTotal.length; 

       if (arrTotal.length==0) {
           return arrPage;
       }

       if (arrTotal.length <= lengthPage) {
          indexini = 0;
          indexfim = arrTotal.length -1; 
       } else  {
          indexini = (((page-1) * lengthPage) + 1 > lenTotal? lenTotal -1 : ((page -1) * lengthPage)  );
          indexfim = ((page  * lengthPage) > lenTotal? lenTotal -1  : (page * lengthPage) -1  ); 
       }   



       arrPage = arrTotal.filter((value,index)=>(index >=indexini && index <= indexfim));
  
       return arrPage;
    }


    textToTime(data:string ):string {
        let retorno:string='';
        if (!data){
            return '';
        }

		data  = data.replace(/[^0-9]+/g,"");
        if (data.length > 0 ) {
           data  = parseInt(data).toString();
        }   
        if (data.length == 1 ) {
           retorno =   '00:0' + data;
        }
        if (data.length == 2 ) {
           retorno =  '00:' + data  ;
        }
        if (data.length == 3 ) {
           retorno = '0'+ data.substr(0,1)+':'+data.substr(1,2);  
        }
        if (data.length >= 4 ) {
           retorno =  data.substr(0,2)+':'+data.substr(2,2);  

        }
        return retorno;
    }
    textToCep(texto:string):string {
       let data:string = texto.replace(/[^0-9]+/g,"");
       let tam:number= data.length;
       if (data.length > 2)  {
           data = data.substr(0,2) + '.' + data.substr(2);
       }
       if (data.length > 7 ) {
           data = data.substr(0,6) + '-' + data.substr(6,3);
       }
       return data;
    }
    textToCnpj(texto:string):string {
       let data:string = texto.replace(/[^0-9]+/g,"");
       if (data.length > 2 ) {
           data = data.substr(0,2) + "." + data.substr(2);
       }
       if (data.length > 6 ) {
           data = data.substr(0,6) + "." + data.substr(6);
       }
       if (data.length > 10 ) {
           data = data.substr(0,10) + "/" + data.substr(10);
       }
       if (data.length > 15 ) {
           data = data.substr(0,15) + "-" + data.substr(15);
       }
       return data ;
      
    }
    textToCpf(texto:string):string {
       let data:string = texto.replace(/[^0-9]+/g,"");
       if (data.length > 3 ) {
           data = data.substr(0,3) + "." + data.substr(3);
       }
       if (data.length > 7 ) {
           data = data.substr(0,7) + "." + data.substr(7);
       }
       if (data.length > 11 ) {
           data = data.substr(0,11) + "-" + data.substr(11);
       }
       return data ;
    }

    textToMoeda( data:string):string{
        let sinal = 1; 
        let retorno:string;
        if (!data){
            return '';
        }
        if (data.substr(0,1) === '-') {
           sinal = -1;    
        }
        if (data.substr(0,1) === '(') {
           sinal = -1;    
        }
		data  = data.replace(/[^0-9]+/g,"");
        if (data.length > 0 ) {
           data  = parseInt(data).toString();
        }   
        if (parseInt(data) === 0){
             return '0';
        } else if ((data === "") && (sinal < 0)) {
           return "-";
        }
        if (data.length == 1 ) {
           retorno = '0,0' + data;
        }
        if (data.length == 2 ) {
           retorno = '0,' + data;
        }
        if (data.length >= 3) {
           let partedecimal:string = data.substr(data.length-2,2);
           let parteinteira:string  = data.substr(0,data.length-2);
           let qtdend :number = parteinteira.length%3; 
           let partemeio:string = parteinteira.substr(qtdend);
           let qtdpontos :number= Math.trunc(parteinteira.length/3);

           // inicio
           retorno = parteinteira.substr(0,qtdend);
           // meio
           for (let i = 0;i<=(qtdpontos-1);i++) {
                if (retorno.length > 0 ) { 
                    retorno += '.'
                }    
                retorno += partemeio.substr(i*3,3);
           }
           // decimal
           retorno += "," + partedecimal;
        }
        
        return (sinal<0?'-':'') + retorno;
    }

   textToPlaca(placa:string) {
     let ret:string="";  
     if (placa.length <= 3) {
        ret = placa.replace(/[^A-Za-z]+/g,"");
        ret = ret.toUpperCase();
     } else {
       ret = placa.substr(0,3).toUpperCase() + "-" + placa.substr(3).replace(/[^0-9]+/g,""); 
     }
     return ret;
   }
   oForEach(pobj:Object,callback:Function){
      for (let i in pobj) {
         if (pobj.hasOwnProperty(i) && i.substr(0,1) !=='$') {
            callback(pobj[i],i);
         }
      }
   }
   prepareModel(pobj:Object){
      let b:Object={}; 
      for (let i in pobj) {
         if (pobj.hasOwnProperty(i) && i.substr(0,1) !=='$' && pobj[i]) {
            b[i] = pobj[i];
         }
      }
   }

   toArray(pobj:Object):Object[]{
       let a:Object[]=[];
       this.oForEach(pobj,function(value,key){
         let b = value;
         b.$key=key;
         b.id=key;  
         a.push(b);
       });
       return a;
   }
   geraId():string {
        let size = 7 ; 
        let randomized = Math.ceil(Math.random() * Math.pow(10,size));
        let digito = Math.ceil(Math.log(randomized));
        while(digito > 10){//Pega o digito inicial e vai refinando até ele ficar menor que dez
			digito = Math.ceil(Math.log(digito));
		}
		var id = randomized + 'X' + digito;//Cria a ID
        return id;
    }
}