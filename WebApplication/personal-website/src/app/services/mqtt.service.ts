import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
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
  private localConfig: GlobalConfigInstance = config;
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
    this.localConfig.region = this.awsRegion;
    // this.authService.getCurrentSession().then((session: CognitoUserSession) => {
    //   console.log("Session", session)
    //   this.localConfig.credentials = new CognitoIdentityCredentials({
    //     IdentityPoolId: environment.awsConfig.Auth.identityPoolId,
    //     Logins: {
    //       [`cognito-idp.${this.awsRegion}.amazonaws.com/${environment.awsConfig.Auth.userPoolId}`]: session.getIdToken().getJwtToken()
    //     },
    //   });

    this.authService.getCurrentCognitoCredentials().then((credentials: ICredentials) => {
      console.log("Here are the currentCredentials", credentials)
      this.deviceOptions.accessKeyId = credentials.accessKeyId;
      this.deviceOptions.secretKey = credentials.secretAccessKey;
      this.deviceOptions.sessionToken = credentials.sessionToken;
      this.mqttClient = new device(this.deviceOptions);
      this.mqttClient.subscribe('blah/blah/blah')
      this.mqttClient.on('message', this.handleMqttMessage);
    });
  }

  handleMqttMessage = (topic, payload) => {
    const message = JSON.parse(payload);
    console.log("topic", topic)
    console.log("message", message)
  }

  //   constructor() { }

  //   ngOnInit() {
  //     this.localConfig.region = 'us-west-2';
  //     this.localConfig.credentials = new CognitoIdentityCredentials({
  //       IdentityPoolId: "us-west-2:e070912f-f98b-45a5-9279-934da23a723d"
  //     });
  //     this.mqttClient = new device(this.deviceOptions);
  //     this.cognitoIdentity = new CognitoIdentity();
  //     (<CognitoIdentityCredentials>this.localConfig.credentials).get((err: AWSError) => {
  //       if (!err) {
  //         var params: CognitoIdentity.GetCredentialsForIdentityInput = {
  //           IdentityId: (<CognitoIdentityCredentials>this.localConfig.credentials).identityId
  //         };
  //         this.cognitoIdentity.getCredentialsForIdentity(params, (err, data) => {
  //           if (!err) {
  //             this.mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
  //               data.Credentials.SecretKey,
  //               data.Credentials.SessionToken,
  //               undefined);
  //           } else {
  //             console.log('error retrieving credentials: ' + err);
  //             alert('error retrieving credentials: ' + err);
  //           }
  //         });
  //       } else {
  //         console.log('error retrieving identity:' + err);
  //         alert('error retrieving identity: ' + err);
  //       }
  //     });

  //     this.deviceConnectionListener = this.deviceConnectionSubject.subscribe((isConnected) => {
  //       console.log('this is isConnected', isConnected);
  //       if (isConnected === true) {
  //         this.deviceConnectionStatus.statusText = 'Device is Connected!';
  //         this.deviceConnectionStatus.color = 'primary'
  //       }
  //       if (isConnected === false) {
  //         this.deviceConnectionStatus.statusText = 'Device is Disconnected!';
  //         this.deviceConnectionStatus.color = 'warn'
  //       }
  //     });

  //     this.mqttClient.subscribe(this.shadowUpdateTopic);
  //     this.mqttClient.subscribe(this.getShadowTopic);
  //     this.mqttClient.subscribe(this.getShadowTopicAccepted);
  //     this.mqttClient.subscribe(this.shadowDeltaTopic);
  //     this.mqttClient.on('message', this.handleMqttMessage);
  //     this.mqttClient.on('connect', this.clientConnect);
  //     this.mqttClient.on('offline', this.clientDisconnect);
  //     this.mqttClient.publish(this.getShadowTopic, "{}");
  //   }

  //   clientConnect = () => {
  //     this.clientConnectionStatus.statusText = 'Connected to IoT Broker!';
  //     this.clientConnectionStatus.color = 'primary';
  //   }

  //   clientDisconnect = () => {
  //     this.clientConnectionStatus.statusText = 'Not Connected to IoT Broker';
  //     this.clientConnectionStatus.color = 'warn';
  //   }

  //   handleMqttMessage = (topic, payload) => {
  //     if (topic === this.getShadowTopicAccepted) {
  //       this.shadowStateDocument = JSON.parse(payload);
  //       this.deviceConnectionSubject.next(this.shadowStateDocument.state.reported.connected);
  //       console.log(this.shadowStateDocument.state.reported.connected)
  //       return
  //     }

  //     if (topic === this.shadowUpdateTopic) {
  //       const objectpayload = JSON.parse(payload);
  //       try {
  //         if (objectpayload.state.reported.connected === false || objectpayload.state.reported.connected === true) {
  //           this.deviceConnectionSubject.next(objectpayload.state.reported.connected)
  //         }
  //       }
  //       catch (error) { }
  //     }
  //     this.mqttMessagesForDisplay.push("Topic====> " + topic + "  Message====> " + payload);

  //   }

  //   publishSliderValue() {
  //     var textToPublish = JSON.stringify({
  //       "state": {
  //         "desired": {
  //           "position": this.sliderValue.toString()
  //         }
  //       }
  //     });
  //     this.mqttClient.publish(this.shadowUpdateTopic, textToPublish);
  //   }

  //   publishTextValue() {
  //     this.mqttClient.publish(this.shadowUpdateTopic, this.iotTextValue);
  //   }
  // }

}