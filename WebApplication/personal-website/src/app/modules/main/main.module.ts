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
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: SideNavComponent, children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'bio', loadChildren: () => import('../bio/bio.module').then(m => m.BioModule) },
      { path: 'lightArray', loadChildren: () => import('../light-array/light-array.module').then(m => m.LightArrayModule), canActivate: [AuthGuardService] },
      { path: 'projectShowcase', loadChildren: () => import('../project-showcase/project-showcase.module').then(m => m.ProjectShowcaseModule) },
    ]
  },
  { path: '**', redirectTo: 'home' }
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
