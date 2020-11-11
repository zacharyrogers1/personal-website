import { NgModule } from '@angular/core';
import { BlindsComponent } from './blinds.component';
import { MaterialModule } from 'src/app/common/material/material.module';



@NgModule({
  declarations: [BlindsComponent],
  imports: [
    MaterialModule
  ],
  exports: [BlindsComponent],
  providers: []
})
export class BlindsModule { }
