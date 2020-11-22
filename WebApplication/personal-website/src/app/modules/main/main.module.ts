import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/common/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SignInStatusComponent } from './components/sign-in-status/sign-in-status.component';

const routes: Routes = [
  {
    path: '', component: SideNavComponent, children: [
      { path: 'demo', loadChildren: () => import('../demo/demo.module').then(m => m.DemoModule) }
    ]
  },
  { path: '**', redirectTo: 'demo' }
];


@NgModule({
  declarations: [ToolbarComponent, MainContentComponent, SideNavComponent, SignInStatusComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AmplifyUIAngularModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class MainModule { }
