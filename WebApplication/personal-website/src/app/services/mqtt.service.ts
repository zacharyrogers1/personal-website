import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsyncSubject, Observable } from 'rxjs';
import { ILightArrayDesiredState, ILightArrayState, IPaintPixel, IPixelPaintUpdate, RgbScreen } from '../modules/light-array/types';
import PubSub, { AWSIoTProvider } from '@aws-amplify/pubsub';


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

  getLightArrayState(): Observable<ILightArrayState> {
    const returnedObservable: AsyncSubject<ILightArrayState> = new AsyncSubject();
    const getStateTopic = `$aws/things/${this.stringLightsThingName}/shadow/get`
    const stateResponseTopic = `$aws/things/${this.stringLightsThingName}/shadow/get/accepted`

    this.subscribeToTopic(stateResponseTopic).subscribe((stateDocument) => {
      console.log("The state document: ", stateDocument)
      returnedObservable.next(stateDocument.value.state);
      returnedObservable.complete();
    });

    setTimeout(() => {
      const emptyStringGetsWholeState = ''
      this.publishToTopic(getStateTopic, emptyStringGetsWholeState);
    }, 1000)

    return returnedObservable
  }

  updateDesiredState(partialDesiredState: Object) {
    const desiredUpdate = {
      state:
      {
        desired: partialDesiredState
      }
    };

    const updateStateTopic: string = `$aws/things/${this.stringLightsThingName}/shadow/update`

    this.publishToTopic(updateStateTopic, desiredUpdate);
  }

  publishToPixelPaint(pixelsToUpdate: IPaintPixel[]) {
    const messageToPublish = { pixelPaint: pixelsToUpdate }
    this.publishToTopic(this.pixelPaintTopic, messageToPublish);
  }

}

