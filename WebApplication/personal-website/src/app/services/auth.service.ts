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

  //Look at this PubSub model from amplify! https://docs.amplify.aws/lib/pubsub/getting-started/q/platform/js

  async getCurrentSession():Promise<CognitoUserSession> {
    return Auth.currentSession();
  }
}
