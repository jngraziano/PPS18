import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Platform, ActionSheetController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginForm: FormGroup;
  constructor(
   
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) { }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

   


    actionSheet.present();
  }
  login() {
		// let data = this.loginForm.value;

		// if (!data.email) {
		// 	return;
		// }

		// let credentials = {
		// 	email: data.email,
		// 	password: data.password
		// };
		// this.auth.signInWithEmail(credentials)
		// 	.then(
		// 		() => this.navCtrl.setRoot(HomePage),
		// 		error => this.loginError = error.message
		// 	);
    // }
    alert("Login correcto");
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Verificacion de usuario',
      message: 'Usuario Correcto',
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    confirm.present();
  }
  // actionSheet.present();
}



