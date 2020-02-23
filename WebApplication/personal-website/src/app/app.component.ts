import { Component, OnInit } from '@angular/core';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentity, config, CognitoIdentityCredentials, AWSError } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'personal-website';
  sliderValue = 0;
  sliderMin = 0;
  sliderMax = 180;
  sliderTickInterval = 10;
  showThumbLabel = true;
  localConfig : GlobalConfigInstance = config;
  mqttClient : device;
  cognitoIdentity;
  mqttMessagesForDisplay = [];
  deviceOptions: DeviceOptions =  {
    region: 'us-west-2',
    host: 'a1n8ytbh0zio90-ats.iot.us-west-2.amazonaws.com',
    clientId: 'Needs_to_be_unique',
    protocol: 'wss',
    maximumReconnectTimeMs: 30000,
    debug: true,
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
  };
  subscruptionTopic = 'blah/blah';
  
  constructor() { }

  ngOnInit() {
    this.localConfig.region = 'us-west-2';
    this.localConfig.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: "us-west-2:ce91c067-fcf7-4681-837c-625d29244057"
    });
    this.mqttClient = new device(this.deviceOptions);
    this.cognitoIdentity = new CognitoIdentity();
    (<CognitoIdentityCredentials>this.localConfig.credentials).get((err : AWSError) => {
      if (!err) {
        var params = {
          IdentityId: (<CognitoIdentityCredentials>this.localConfig.credentials).identityId
        };
        this.cognitoIdentity.getCredentialsForIdentity(params, (err, data) => {
          if (!err) {
            //
            // Update our latest AWS credentials; the MQTT client will use these
            // during its next reconnect attempt.
            //
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
  }

  handleMqttMessage = (topic, payload) => {
    console.log(payload)
    this.mqttMessagesForDisplay.push(payload);
  }


  setTo5() {
    this.sliderValue = 5;
  }

  setTo180() {
    this.sliderValue = 180;
    this.mqttMessagesForDisplay.push('hello');
  }

  whatToDoWhenValueChanges(event) {
    console.log(event);
    console.log("here is the value!", event.value);
  }
}
