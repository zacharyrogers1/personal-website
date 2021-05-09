import { Injectable } from '@angular/core';
import { PubSub } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers/AWSIotProvider";
import { AsyncSubject, Observable } from 'rxjs';
import { ILightArrayState, IPaintPixel, IPixelPaintUpdate, RgbScreen } from '../modules/light-array/types';


@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private readonly stringLightsThingName: string = 'stringLights';
  private readonly pixelPaintTopic: string = `${this.stringLightsThingName}/pixelPaint`;

  constructor() { }

  subscribeToTopic(topic: string) {
    return PubSub.subscribe(topic)
  }

  async publishToTopic(topic: string, message): Promise<void> {
    PubSub.publish(topic, message);
  }

  addPluggable() {
    PubSub.addPluggable(new AWSIoTProvider({
      aws_pubsub_region: environment.awsConfig.Auth.region,
      aws_pubsub_endpoint: `wss://${environment.awsConfig.iot.endpoint}/mqtt`,
    }));
    console.log("AmplifyPubsub", PubSub);
  }

  printPubSub() {
    console.log("Current AmplifyPubSub", PubSub)
  }

  getDesiredState(): Observable<ILightArrayState> {
    const returnedObservable: AsyncSubject<ILightArrayState> = new AsyncSubject();
    const getStateTopic = `$aws/things/${this.stringLightsThingName}/shadow/get`
    const stateResponseTopic = `$aws/things/${this.stringLightsThingName}/shadow/get/accepted`

    this.subscribeToTopic(stateResponseTopic).subscribe((stateDocument) => {
      console.log("The state document: ", stateDocument)
      returnedObservable.next(stateDocument.value.state.desired);
      returnedObservable.complete();
    });

    setTimeout(() => {
      const emptyStringGetsWholeState = ''
      this.publishToTopic(getStateTopic, emptyStringGetsWholeState);
    }, 1000)

    return returnedObservable
  }

  publishChangeToState(change: Object) {
    const updateStateTopic: string = `$aws/things/${this.stringLightsThingName}/shadow/update`
    // const stateToString = JSON.stringify(change)

    this.publishToTopic(updateStateTopic, change);
  }

  publishScreenToPixelPaint(screen: RgbScreen) {
    const messageToPublish = { pixelPaint: screen };
    // this.publishToTopic(this.pixelPaintTopic, messageToPublish);
  }

  publishIndividualToPixelPaint(pixelToUpdate: IPaintPixel) {
    const messageToPublish = { pixelPaint: pixelToUpdate }
    console.log("Publishing Individual pixel ", messageToPublish);
    this.publishToTopic(this.pixelPaintTopic, messageToPublish);
  }

}

