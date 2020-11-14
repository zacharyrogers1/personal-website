import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorseWaterAppComponent } from './horse-water-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: HorseWaterAppComponent, children: [
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [HorseWaterAppComponent, ToolbarComponent, MainContentComponent, SideNavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class HorseWaterModule { }
