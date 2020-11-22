import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectShowcaseComponent } from './project-showcase.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MaterialModule } from 'src/app/common/material/material.module';

const routes: Routes = [
  {
    path: '', component: ProjectShowcaseComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [ProjectShowcaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class ProjectShowcaseModule { }
