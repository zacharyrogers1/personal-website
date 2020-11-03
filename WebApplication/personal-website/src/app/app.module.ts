import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import Amplify from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { BlindsModule } from './modules/blinds/blinds.module';
import { AuthService } from './services/auth.service';
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

Amplify.configure(environment.awsConfig);
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: environment.awsConfig.Auth.region,
  aws_pubsub_endpoint: `wss://${environment.awsConfig.iot.endpoint}/mqtt`,
}));

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
