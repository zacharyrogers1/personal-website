import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorseWaterAppComponent } from './horse-water-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInStatusComponent } from './components/sign-in-status/sign-in-status.component';


const routes: Routes = [
  {
    path: '', component: HorseWaterAppComponent, children: [
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [HorseWaterAppComponent, ToolbarComponent, MainContentComponent, SideNavComponent, SignInStatusComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AmplifyUIAngularModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class HorseWaterModule { }
