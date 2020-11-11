import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DefaultComponent } from './default.component';
import { MaterialModule } from 'src/app/common/material/material.module';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [DefaultComponent]
})
export class DefaultModule { }
