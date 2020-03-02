import { Component, OnInit } from '@angular/core';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentity, config, CognitoIdentityCredentials, AWSError } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { v4 } from 'uuid';
import { Subject, Observable, Subscription } from 'rxjs';

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
  shadowUpdateTopic: string = '$aws/things/ConsoleThing2/shadow/update';
  getShadowTopic: string = '$aws/things/ConsoleThing2/shadow/get';
  getShadowTopicAccepted: string = '$aws/things/ConsoleThing2/shadow/get/accepted';
  shadowDeltaTopic: string = '$aws/things/ConsoleThing2/shadow/update/delta';
  iotTextValue: string = '';
  clientConnectionStatus = { statusText: 'Not Connected to IoT Broker', color: 'warn' };
  deviceConnectionStatus = { statusText: 'Loading', color: 'warn' }
  shadowStateDocument;
  deviceConnectionSubject: Subject<boolean> = new Subject<boolean>();
  deviceConnectionListener: Subscription;

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

    this.deviceConnectionListener = this.deviceConnectionSubject.subscribe((isConnected) => {
      console.log('this is isConnected', isConnected);
      if (isConnected === true) {
        this.deviceConnectionStatus.statusText = 'Device is Connected!';
        this.deviceConnectionStatus.color = 'primary'
      }
      if (isConnected === false) {
        this.deviceConnectionStatus.statusText = 'Device is Disconnected!';
        this.deviceConnectionStatus.color = 'warn'
      }
    });

    this.mqttClient.subscribe(this.shadowUpdateTopic);
    this.mqttClient.subscribe(this.getShadowTopic);
    this.mqttClient.subscribe(this.getShadowTopicAccepted);
    this.mqttClient.subscribe(this.shadowDeltaTopic);
    this.mqttClient.on('message', this.handleMqttMessage);
    this.mqttClient.on('connect', this.clientConnect);
    this.mqttClient.on('offline', this.clientDisconnect);
    this.mqttClient.publish(this.getShadowTopic, "{}");
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
    if (topic === this.getShadowTopicAccepted) {
      this.shadowStateDocument = JSON.parse(payload);
      this.deviceConnectionSubject.next(this.shadowStateDocument.state.reported.connected);
      console.log(this.shadowStateDocument.state.reported.connected)
      return
    }

    if (topic === this.shadowUpdateTopic) {
      const objectpayload = JSON.parse(payload);
      try {
        if (objectpayload.state.reported.connected === false || objectpayload.state.reported.connected === true) {
          this.deviceConnectionSubject.next(objectpayload.state.reported.connected)
        }
      }
      catch (error) { }
    }
    this.mqttMessagesForDisplay.push("Topic====> " + topic + "  Message====> " + payload);
  }

  publishSliderValue() {
    var textToPublish = JSON.stringify({
      "state": {
        "desired": {
          "position": this.sliderValue.toString()
        }
      }
    });
    this.mqttClient.publish(this.shadowUpdateTopic, textToPublish);
  }

  publishTextValue() {
    this.mqttClient.publish(this.shadowUpdateTopic, this.iotTextValue);
  }
}