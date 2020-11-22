import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth, Hub } from 'aws-amplify';
import { ICredentials }  from "aws-amplify/lib-esm/Common/types/types"


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async getCurrentCognitoCredentials():Promise<ICredentials> {
    return Auth.currentCredentials();
  }

  async getCurrentSession():Promise<CognitoUserSession> {
   
    return Auth.currentSession();
  }

  async getCurrentUserInfo():Promise<any> {
    return Auth.currentUserInfo();
  }

  async signOut(): Promise<any> {
    return Auth.signOut()
  }

  async isCurrentUserLoggedIn(): Promise<boolean> {
    let userIsLoggedIn:boolean;
    try {
      await Auth.currentAuthenticatedUser();
      userIsLoggedIn = true;
    } catch {
      userIsLoggedIn = false;
    }
    return userIsLoggedIn
  }
}
