import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightArrayComponent } from './light-array.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { PixelPaintComponent } from './pixel-paint/pixel-paint.component';

const routes: Routes = [
  {
    path: '', component: LightArrayComponent
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [LightArrayComponent, PixelPaintComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ColorPickerModule
  ]
})
export class LightArrayModule { }

