import { Component, OnInit, ViewChild } from '@angular/core';
import {timer} from 'rxjs';
import { ToastController } from '@ionic/angular';
declare var SMSReceive: any;

@Component({
  selector: 'app-smsreader',
  templateUrl: './smsreader.page.html',
  styleUrls: ['./smsreader.page.scss'],
})
export class SMSReaderPage implements OnInit {

  @ViewChild('otpInput',{static:false}) otpInput:any; //static=false tells angular to resolve any query params before change detection runs in case it is dependent on *ngIf
  timeout=30; //seconds
  currentTime=0;
  myTimer:any;
  isListening:boolean=false;

  smsText='Waiting to receive SMS';
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder:'',
    inputStyles: {
      'width': '64px',
      'font-size': '24px',
      'font-weight': '700',
      'height': '64px'
    }
  };
  constructor(private toastCtrl:ToastController) { }

  ngOnInit() 
  {
    
    this.registerSmsReceiver();

  }
  registerSmsReceiver() 
  {
    this.currentTime=0;
    this.loopTimer();
    SMSReceive.startWatch(
      () => {
        console.log('Watch Started');
        this.isListening=true;
        document.addEventListener('onSMSArrive', (e: any) => 
        {
          console.log(e.data);
          var IncomingSMS = e.data;
          this.parseSMS(IncomingSMS.body);
          IncomingSMS=null;
        });
      },
      () => { console.log('watch start failed') }
    )
  }

  loopTimer()
  {
    this.myTimer=timer(1000).subscribe(()=>
    {
      //upon timeout
      this.currentTime++;
      if(this.currentTime>=this.timeout)
      {
        this.endTimer();
      }
      else
      {
        this.loopTimer();
      }
    });
  }

  endTimer() 
  {
    this.unregisterSMSReader();
  }

  onOtpChange($event)
  {
    console.log($event);
  }

  setOtpValue(otp)
  {
    this.otpInput.setValue(otp);
  }

  unregisterSMSReader()
  {
    this.smsText='Not Listenting to SMS events';
    SMSReceive.stopWatch(
      () => 
      { 
        console.log('watch stopped');
        this.isListening=false; 
      },
      () => { console.log('watch stop failed') }
    )

  }

  ionViewDidLeave()
  {
    this.unregisterSMSReader(); //If user closes the app, we will unregister the sms receiver
  }

  parseSMS(smsData:string)
  {
    this.smsText=smsData;
    let hasOTP=smsData.includes('OTP is ');
    let index=smsData.search(/['OTP is '][0-9]{5}/);
    
    let otp= smsData.substr(index+1,5);
    console.log(index+"--"+otp);

    if(!hasOTP || otp==undefined || otp==null)
    {
      this.presentToast('Failed to parse SMS');
    }
    else
    {
      this.setOtpValue(otp);
    }
  }

  async presentToast(msg,time=3000)
  {
    const toast=await this.toastCtrl.create(
      {
        message:msg,
        duration:time
      });
      toast.present();
  }

}
