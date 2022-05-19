// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// UI library
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

// main app stuff
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { BookingFormPageComponent } from './pages/booking-form/booking-form.component';
import { ApiService } from './services/api/api.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    BookingFormPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzTypographyModule,
    NzGridModule,
    NzModalModule,
    NzSpinModule,
    NzNotificationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
