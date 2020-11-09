import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import Amplify, { Auth, PubSub } from 'aws-amplify';
import { ICredentials } from 'aws-amplify/lib-esm/Common/types/types';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentityCredentials, config } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { AuthService } from './auth.service';
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  constructor(
    private authService: AuthService
  ) {
  }

  subscribeToTopic(topic: string) {
    return Amplify.PubSub.subscribe(topic)
  }

  addPluggable() {
    Amplify.addPluggable(new AWSIoTProvider({
      aws_pubsub_region: environment.awsConfig.Auth.region,
      aws_pubsub_endpoint: `wss://${environment.awsConfig.iot.endpoint}/mqtt`,
    }));
    console.log("AmplifyPubsub", Amplify.PubSub)
  }

  removePluggables() {
    Amplify.PubSub._pluggables = []
    console.log("pluggables were removed")
  }

}