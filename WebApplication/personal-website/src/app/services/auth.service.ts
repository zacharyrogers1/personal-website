import { Injectable } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    Hub.listen('auth', (data) => {
      console.log("Here is information on auth", data)
    })
  }

  async getCurrentCognitoCredentials():Promise<any> {
    return await Auth.currentCredentials()
  }
}
