import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SMSReaderPageRoutingModule } from './smsreader-routing.module';

import { SMSReaderPage } from './smsreader.page';
import {NgOtpInputModule} from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    SMSReaderPageRoutingModule
  ],
  declarations: [SMSReaderPage]
})
export class SMSReaderPageModule {}
