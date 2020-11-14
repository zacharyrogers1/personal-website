import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexboxComponent } from './flexbox/flexbox.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'buttons', component: ButtonsComponent},
  {path: 'flexbox', component: FlexboxComponent},
  {path: '**', redirectTo: 'buttons'}
];
@NgModule({
  declarations: [ButtonsComponent, FlexboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule
  ]
})
export class DemoModule { }
