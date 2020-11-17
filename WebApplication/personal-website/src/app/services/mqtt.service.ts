import { Injectable } from '@angular/core';
import Amplify from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers/AWSIotProvider";

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  constructor() {}

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

  printPubSub() {
    console.log("Current AmplifyPubSub", Amplify.PubSub)
  }

}