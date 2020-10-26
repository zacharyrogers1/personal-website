import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlindsComponent } from './blinds.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [BlindsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  exports: [BlindsComponent],
  providers: []
})
export class BlindsModule { }
