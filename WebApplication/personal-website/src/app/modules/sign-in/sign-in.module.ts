import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

const routes: Routes = [
  {
    path: '', component: SignInComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    AmplifyUIAngularModule
  ]
})
export class SignInModule { }
