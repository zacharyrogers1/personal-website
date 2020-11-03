import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth, Hub } from 'aws-amplify';
import { ICredentials }  from "aws-amplify/lib-esm/Common/types/types"


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    Hub.listen('auth', (data) => {
      console.log("Here is information on auth", data)
    })
  }

  async getCurrentCognitoCredentials():Promise<ICredentials> {
    // Auth.currentUserCredentials().then((data)=> {
    //   console.log("currentUserCredentials", data)
    // })
    return Auth.currentCredentials();
  }
  //Look at this PubSub model from amplify! https://docs.amplify.aws/lib/pubsub/getting-started/q/platform/js

  async getCurrentSession():Promise<CognitoUserSession> {
    return Auth.currentSession();
  }
}
