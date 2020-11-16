import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Amplify from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { BlindsModule } from './modules/blinds/blinds.module';
import { DefaultComponent } from './modules/default/default.component';
import { DefaultModule } from './modules/default/default.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

Amplify.configure(environment.awsConfig);


const routes: Routes = [
  {path: 'demo', loadChildren: ()=> import('./modules/demo/demo.module').then(m => m.DemoModule)},
  {path: 'horseWater', loadChildren: ()=> import('./modules/horse-water/horse-water.module').then(m => m.HorseWaterModule)},
  {path: 'signIn', loadChildren: ()=> import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)},
  {path: '', redirectTo: 'horseWater', pathMatch: 'full'},
  {path: '**', loadChildren: 'horseWater'}
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
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
