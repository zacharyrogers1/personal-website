import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightArrayComponent } from './light-array.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';

const routes: Routes = [
  {
    path: '', component: LightArrayComponent
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [LightArrayComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class LightArrayModule { }

