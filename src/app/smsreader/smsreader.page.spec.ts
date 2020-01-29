import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SMSReaderPage } from './smsreader.page';

describe('SMSReaderPage', () => {
  let component: SMSReaderPage;
  let fixture: ComponentFixture<SMSReaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMSReaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SMSReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
