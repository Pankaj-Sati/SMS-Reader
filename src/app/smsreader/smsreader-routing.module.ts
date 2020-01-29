import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SMSReaderPage } from './smsreader.page';

const routes: Routes = [
  {
    path: '',
    component: SMSReaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SMSReaderPageRoutingModule {}
