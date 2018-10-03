export class Usuario {
    id: number;         // id, del 1 al 3 para los 5 personajes
    usMail: string;     // email segun la consigna...
    usPass: string;      // contraseña
    perfil: string;     // puede ser: admin || usuario 
    sexo: string;       // puede ser Female || Male
  
    constructor(email:string,password:string){
      this.usMail=email;
      this.usPass=password;
    }
  
    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }
}
