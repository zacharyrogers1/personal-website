import { Component, OnInit, ChangeDetectorRef, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private ngZone:NgZone
  ) { 
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.changeDetectorRef.detectChanges();
      if(authState === 'signedin') {
        this.ngZone.run(()=> this.router.navigateByUrl(''))
      }
    })
  }

  ngOnInit(): void {
  }

}
