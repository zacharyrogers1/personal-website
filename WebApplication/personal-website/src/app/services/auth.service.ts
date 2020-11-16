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
}
