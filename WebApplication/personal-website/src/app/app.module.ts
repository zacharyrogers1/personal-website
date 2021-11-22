import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { BlindsModule } from './modules/blinds/blinds.module';
import { RouterModule, Routes } from '@angular/router';
import { Amplify } from '@aws-amplify/core';
import { StoreModule } from '@ngrx/store';
import { initialAppState, reducers } from './store/initialState';
import { EffectsModule } from '@ngrx/effects';
import { LightArrayEffects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

Amplify.configure(environment.awsConfig);


const routes: Routes = [
  { path: 'signIn', loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: '', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: '**', loadChildren: 'home' }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserModule,
    BrowserAnimationsModule,
    AmplifyUIAngularModule,
    BlindsModule,
    StoreModule.forRoot(reducers, {initialState: initialAppState}),
    EffectsModule.forRoot([LightArrayEffects]),
    StoreDevtoolsModule.instrument({maxAge: 100}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
