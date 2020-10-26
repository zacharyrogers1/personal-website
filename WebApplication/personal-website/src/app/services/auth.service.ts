import { Injectable } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    Auth.currentCredentials().then((data) => {
      console.log("Here are the user credentials", data)
    })
    Hub.listen('auth', (data) => {
      console.log("Here is information on auth", data)
    })
  }
}
