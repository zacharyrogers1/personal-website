import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { PubSub } from 'aws-amplify';
import { ICredentials } from 'aws-amplify/lib-esm/Common/types/types';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentityCredentials, config } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private mqttClient: device;
  private clientIdUuid: string = v4();
  private awsRegion: string = 'us-east-1';
  private deviceOptions: DeviceOptions = {
    region: this.awsRegion,
    host: 'a1n8ytbh0zio90-ats.iot.us-east-1.amazonaws.com',
    clientId: this.clientIdUuid,
    protocol: 'wss',
    maximumReconnectTimeMs: 8000,
    debug: true,
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
  };


  constructor(
    private authService: AuthService
  ) {
    PubSub.subscribe('blah/blah/blah').subscribe({
      next: (data) => {console.log("Data:", data)},
      error:(error) => {console.log("Error:", error)}
    })
    // this.authService.getCurrentCognitoCredentials().then((credentials: ICredentials) => {
      // console.log("Here are the currentCredentials", credentials)
      // this.deviceOptions.accessKeyId = credentials.accessKeyId;
      // this.deviceOptions.secretKey = credentials.secretAccessKey;
      // this.deviceOptions.sessionToken = credentials.sessionToken;
      // this.mqttClient = new device(this.deviceOptions);
      // this.mqttClient.subscribe('blah/blah/blah')
      // // this.mqttClient.subscribe('bleh/bleh/bleh')
      // this.mqttClient.on('message', this.handleMqttMessage);
    // });
  }

  handleMqttMessage = (topic, payload) => {
    const message = JSON.parse(payload);
    console.log("topic", topic)
    console.log("message", message)
  }

}