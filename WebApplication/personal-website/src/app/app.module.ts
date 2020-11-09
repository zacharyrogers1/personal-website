import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Amplify from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { BlindsModule } from './modules/blinds/blinds.module';

Amplify.configure(environment.awsConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AmplifyUIAngularModule,
    BlindsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
