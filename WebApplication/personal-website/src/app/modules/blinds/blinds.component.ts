import { Component, OnInit } from '@angular/core';
import { device, DeviceOptions } from 'aws-iot-device-sdk';
import { CognitoIdentity, config, CognitoIdentityCredentials, AWSError } from 'aws-sdk';
import { GlobalConfigInstance } from 'aws-sdk/lib/config';
import { v4 } from 'uuid';
import { Subject, Subscription } from 'rxjs';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'blinds',
  templateUrl: './blinds.component.html',
  styleUrls: ['./blinds.component.scss']
})
export class BlindsComponent implements OnInit {
  title: string = 'personal-website';
  sliderValue: number = 0;
  sliderMin: number = 0;
  sliderMax: number = 180;
  sliderTickInterval: number = 10;
  showThumbLabel: boolean = true;
  localConfig: GlobalConfigInstance = config;
  mqttClient: device;
  cognitoIdentity: CognitoIdentity;
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


  constructor(
    private mqttService: MqttService,
  ) { 

  }

  ngOnInit() {

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

