import { Component, OnInit } from '@angular/core';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentity, config, CognitoIdentityCredentials, AWSError } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { v4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'personal-website';
  sliderValue: number = 0;
  sliderMin: number = 0;
  sliderMax: number = 180;
  sliderTickInterval: number = 10;
  showThumbLabel: boolean = true;
  localConfig: GlobalConfigInstance = config;
  mqttClient: device;
  cognitoIdentity;
  mqttMessagesForDisplay = [];
  clientIdUuid: string = v4();
  deviceOptions: DeviceOptions = {
    region: 'us-west-2',
    host: 'a1n8ytbh0zio90-ats.iot.us-west-2.amazonaws.com',
    clientId: this.clientIdUuid,
    protocol: 'wss',
    maximumReconnectTimeMs: 8000,
    debug: true,
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
  };
  subscruptionTopic = '$aws/things/ConsoleThing2/shadow/update';
  iotTextValue: string = '';

  clientConnectionStatus = {statusText: 'Not Connected to IoT Broker', color: 'warn'};

  constructor() { }

  ngOnInit() {
    this.localConfig.region = 'us-west-2';
    this.localConfig.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: "us-west-2:e070912f-f98b-45a5-9279-934da23a723d"
    });
    this.mqttClient = new device(this.deviceOptions);
    this.cognitoIdentity = new CognitoIdentity();
    (<CognitoIdentityCredentials>this.localConfig.credentials).get((err: AWSError) => {
      if (!err) {
        var params = {
          IdentityId: (<CognitoIdentityCredentials>this.localConfig.credentials).identityId
        };
        this.cognitoIdentity.getCredentialsForIdentity(params, (err, data) => {
          if (!err) {
            this.mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
              data.Credentials.SecretKey,
              data.Credentials.SessionToken,
              undefined);
          } else {
            console.log('error retrieving credentials: ' + err);
            alert('error retrieving credentials: ' + err);
          }
        });
      } else {
        console.log('error retrieving identity:' + err);
        alert('error retrieving identity: ' + err);
      }
    });

    this.mqttClient.subscribe(this.subscruptionTopic);
    this.mqttClient.on('message', this.handleMqttMessage);
    this.mqttClient.on('connect', this.clientConnect);
    this.mqttClient.on('offline', this.clientDisconnect);
  }

  clientConnect = () => {
    this.clientConnectionStatus.statusText = 'Connected to IoT Broker!';
    this.clientConnectionStatus.color = 'primary';
  }

  clientDisconnect = () => {
    this.clientConnectionStatus.statusText = 'Not Connected to IoT Broker';
    this.clientConnectionStatus.color = 'warn';
  }

  handleMqttMessage = (topic, payload) => {
    this.mqttMessagesForDisplay.push("Topic: " + topic + " Message: " + payload);
  }

  publishSliderValue() {
    var textToPublish = JSON.stringify({
      "state": {
        "desired": {
          "position": this.sliderValue.toString()
        }
      }
    });
    console.log("slider value", this.sliderValue);
    this.mqttClient.publish(this.subscruptionTopic, textToPublish);
  }

  publishTextValue() {
    this.mqttClient.publish(this.subscruptionTopic, this.iotTextValue);
  }
}