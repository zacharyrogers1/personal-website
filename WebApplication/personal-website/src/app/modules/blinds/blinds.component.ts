import { Component, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'blinds',
  templateUrl: './blinds.component.html',
  styleUrls: ['./blinds.component.scss']
})
export class BlindsComponent implements OnInit {
  topicSubscription

  constructor(
    private mqttService: MqttService,
  ) {

  }

  ngOnInit() {

  }

  subscribeToTopic() {
    this.topicSubscription = this.mqttService.subscribeToTopic('bleh/bleh/bleh').subscribe({
      next: (message) => {
        console.log("DATA", message)
      },
      error: (error) => {
        console.log("Subscribe Error", error)
      }
    })
  }

  unsubscribeToTopic() {
    this.topicSubscription.unsubscribe()
  }

  addPluggable() {
    this.mqttService.addPluggable()
  }

  printPubSub() {
    this.mqttService.printPubSub();
  }
}

