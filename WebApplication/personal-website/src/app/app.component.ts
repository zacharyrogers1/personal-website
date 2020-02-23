import { Component, OnInit } from '@angular/core';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentity, config, CognitoIdentityCredentials, AWSError } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { stringify } from 'querystring';

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
  constructor() { }

  mqttClient;
  cognitoIdentity;
  rachelsGarbage;
  deviceOptions: DeviceOptions =  {
    region: 'us-west-2',
    host: 'a1n8ytbh0zio90-ats.iot.us-east-1.amazonaws.com',
    clientId: 'Needs_to_be_unique',
    protocol: 'wss',
    maximumReconnectTimeMs: 30000,
    debug: true,
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
  };
  // cognitoIdentityOptions: CognitoIdentityCredentials.CognitoIdentityOptions = 

  

  //Config needs
  //set region
  //set credentials


  ngOnInit() {
    this.localConfig.region = 'us-west-2';
    config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: "us-west-2:ce91c067-fcf7-4681-837c-625d29244057"
    });
    this.mqttClient = new device(this.deviceOptions);
    this.cognitoIdentity = new CognitoIdentity();
    console.log("AWS Config before retrieving identity", this.localConfig.credentials);
    (<CognitoIdentityCredentials>this.localConfig.credentials).get((err : AWSError) => {
      if (!err) {
        console.log('retrieved identity: ' + config);
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
              data.Credentials.SessionToken);
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
  }


  setTo5() {
    this.sliderValue = 5;
  }

  setTo180() {
    this.sliderValue = 180;
  }

  whatToDoWhenValueChanges(event) {
    console.log(event);
    console.log("here is the value!", event.value);
  }
}
