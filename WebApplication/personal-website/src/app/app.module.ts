import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Amplify from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { BlindsModule } from './modules/blinds/blinds.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

Amplify.configure(environment.awsConfig);


const routes: Routes = [
  { path: 'signIn', loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: '', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: '**', loadChildren: 'home' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    AmplifyUIAngularModule,
    BlindsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
