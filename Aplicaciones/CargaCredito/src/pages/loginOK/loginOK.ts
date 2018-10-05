

import { ViewChild  } from "@angular/core";

import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { IonicPage, NavController, ToastController, ActionSheetController, ModalController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// import { AngularFireModule } from 'angularfire2';

import { Observable } from 'rxjs';

import { Usuario } from '../../clases/usuario';



import { User } from '../../providers';
import { MainPage } from '../';
import { ContentPage } from "../content/content";
// import {  } from "../../pages/pag";


@IonicPage()
@Component({
  selector: 'loginOK',
  templateUrl: 'loginOK.html'
})
export class loginOK {

  UsuarioColeccionFirebase : AngularFirestoreCollection<Usuario>;
  ListadoUsuariosObser: Observable<Usuario[]>;
  
  loginFields: { email: string, password: string } = {
    email: '',
    password: ''
  };

  cuentas: Array<Usuario>;
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private fireStoreObj: AngularFirestore,
    public actionSheetCtrl: ActionSheetController) {

      // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      //   this.loginErrorString = value;
      // })

   
   }


  //Funcion que va desde el form que borre en el html.
  
  doLogin() {

    //#region SIN FIREBASE
    // let flagNotOK: number=0;
    // let user: Usuario = new Usuario("","");

    // if (this.loginFields.email != "" && this.loginFields.password != "") {
    //   user.usMail=this.loginFields.email  
    //   user.usPass=this.loginFields.password;
    //   this.navCtrl.push(MainPage);
    // }
    // else{
    //   let toast = this.toastCtrl.create({
    //           message: "Debe completar los campos.",
    //           duration: 3000,
    //           position: 'top'
    //         });
    //         toast.present();
    //         flagNotOK=1;

    // }
   //#endregion
   
    //#region Parte del spinner
  

  //#endregion


  this.UsuarioColeccionFirebase = this.fireStoreObj.collection<Usuario>('usuarios', ref=> ref.orderBy('id','asc'));
  this.ListadoUsuariosObser = this.UsuarioColeccionFirebase.valueChanges();
  this.ListadoUsuariosObser.subscribe(x => {
      console.info("Conexión correcta con Firebase. Usuarios: ", x);
    });
  this.ListadoUsuariosObser.forEach((element) => {
    this.cuentas = element;
    let unUsuario: Usuario = this.cuentas.find(element =>(this.loginFields.email == element.usMail && (this.loginFields.password == element.usPass)));
    if (unUsuario !== undefined) {
      sessionStorage.setItem('usuario', JSON.stringify(unUsuario));
      //pushea la pagina
      this.navCtrl.push(MainPage);
      
    }
    else{
        let toast = this.toastCtrl.create({
          message: "Acceso incorrecto.",
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
    }
  });    


  }
  mostrarUsuarios(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ingresar como...',
      enableBackdropDismiss: true,
      cssClass: 'actSheet',
      buttons: [
        { text: 'admin', handler: () => {this.setLog(1);}},
        { text: 'usuario', handler: () => {this.setLog(2);}},
       
        {
          text: 'Cancelar', cssClass: 'btnCancel', role: 'cancel', handler: () => {  }
        }
      ]
    });
    actionSheet.id = 'actSheet';
    actionSheet.present();
  }

  setLog(i: number) {
    switch (i) {
      case 1:
        this.loginFields.email = "admin@gmail.com";
        this.loginFields.password = '11';
        break;

      case 2:
      this.loginFields.email = "usuario@gmail.com";
      this.loginFields.password = '22';
        break;

    
      default:
        break;
    }
  }

  // ionViewDidLoad() {
  //   setTimeout(() => this.splash = false, 4000);
  // }
}
