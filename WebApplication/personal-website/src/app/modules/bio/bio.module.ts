import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BioComponent } from './bio.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';

const routes: Routes = [
  {
    path: '', component: BioComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [BioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class BioModule { }
