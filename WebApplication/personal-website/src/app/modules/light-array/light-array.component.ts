import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MqttService } from 'src/app/services/mqtt.service';
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers/AWSIotProvider";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-light-array',
  templateUrl: './light-array.component.html',
  styleUrls: ['./light-array.component.scss']
})
export class LightArrayComponent implements OnInit {

  lightArrayFormGroup: FormGroup = new FormGroup({
    activeAnimation: new FormControl('')
  });
  animationOptions = [
    {
      value: 'countdown',
      viewValue: 'Countdown'
    },
    {
      value: 'pingPong',
      viewValue: 'Ping Pong'
    },
    {
      value: 'unifiedRainbow',
      viewValue: 'Unified Rainbow'
    },
    {
      value: 'chasingLights',
      viewValue: 'Chasing Lights'
    },
  ]

  constructor(
    private mqttService: MqttService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    // const isUserSignedIn = await this.authService.isCurrentUserLoggedIn();
    // console.log(isUserSignedIn)

    // const theSubscritpition = this.mqttService.subscribeToTopic('$aws/things/stringLights/shadow/update/delta')
    // theSubscritpition.subscribe((value:IDeltaChanges) => {
    //   console.log('Here are the update changes: ', value.value.state)
    // });

    this.mqttService.getDesiredState('stringLights').subscribe((stateDoc) => {
      console.log('component state doc: ', stateDoc)
      this.lightArrayFormGroup.controls.activeAnimation.setValue(stateDoc.activeAnimation)
    });

    this.lightArrayFormGroup.controls.activeAnimation.valueChanges.subscribe((activeAnimation: string) => {
      console.log('Changing the active Animation to: ', activeAnimation)
      this.changeActiveAnimation(activeAnimation)
    })

  }

  changeActiveAnimation(activeAnimation: string) {
    const change = {
      state:
      {
        desired:
          { activeAnimation: activeAnimation }
      }
    }

    this.mqttService.publishChangeToState(change)

  }

}


export interface IDeltaChanges {
  provider: AWSIoTProvider
  value: {
    metadata: Object
    state: ILightArrayState
    timestamp: number
    version: number
    'Symbol(topic)': string
  }
}

export interface ILightArrayState {
  activeAnimation: string,
  animations: {
    countdown: {
      timeInSeconds: number
    },
    pingPong: {
      speed: number,
      color: RgbColor
    },
    unifiedRainbow: {
      speed: number
    },
    chasingLights: {
      speed: number,
      numLitPixels: number,
      color: RgbColor
    }
  }
}

export type RgbColor = [number, number, number]
