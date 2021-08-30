import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in-status',
  templateUrl: './sign-in-status.component.html',
  styleUrls: ['./sign-in-status.component.scss']
})
export class SignInStatusComponent implements OnInit {
  username: string
  authenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.authService.getCurrentUserInfo().then((idk) => {
      this.username = idk?.username
    })

    this.authService.getCurrentCognitoCredentials().then((cognitoCredentials) => {
      this.authenticated = cognitoCredentials.authenticated;
    })
  }

  signOut():void {
    this.authService.signOut().then(() => {
      this.username = undefined;
      this.authenticated = false;
    })
  }

  navigateToSignIn():void {
    this.router.navigateByUrl('/signIn')
  }

}
