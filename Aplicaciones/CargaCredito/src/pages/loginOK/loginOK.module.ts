import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { loginOK } from './loginOK';

@NgModule({
  declarations: [
    loginOK,
  ],
  imports: [
    IonicPageModule.forChild(loginOK),
    TranslateModule.forChild()
  ],
  exports: [
    loginOK
  ]
})
export class WelcomePageModule { }
