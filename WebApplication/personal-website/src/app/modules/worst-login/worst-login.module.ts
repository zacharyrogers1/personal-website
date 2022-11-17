import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorstLoginComponent } from './worst-login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../common/material/material.module';

const routes: Routes = [
  {
    path: '', component: WorstLoginComponent
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    WorstLoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class WorstLoginModule { }
