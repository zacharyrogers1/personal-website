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
    activeAnimation: new FormControl(''),
    animations: new FormGroup({
      chasingLights: new FormGroup({
        speed: new FormControl(1),
        numLitPixels: new FormControl(3),
        color: new FormControl([0, 0, 255])
      }),
      pingPong: new FormGroup({
        speed: new FormControl(1),
        color: new FormControl([0, 0, 255])
      }),
      unifiedRainbow: new FormGroup({
        speed: new FormControl(1),
      }),
      countdown: new FormGroup({
        timeInSeconds: new FormControl(10),
      })
    })
  });


  constructor(
    private mqttService: MqttService,
  ) { }

  async ngOnInit() {

    this.mqttService.getDesiredState('stringLights').subscribe((stateDoc: ILightArrayState) => {
      console.log('component state doc: ', stateDoc)
      this.lightArrayFormGroup.setValue(stateDoc);
    });

    this.lightArrayFormGroup.valueChanges.subscribe((desiredState: ILightArrayState) => {
      console.log('Value of lightArrayFormGroup: ', desiredState)
      this.updateDesiredState(desiredState)
    })

  }

  updateDesiredState(desiredState: Object) {
    const change = {
      state:
      {
        desired: desiredState
      }
    }

    this.mqttService.publishChangeToState(change)
  }

}

//1. Define a static setup of each of the animations and what it needs for forms
//2. Create dynamic forms by grabbing the state of the data first then looping through and dynamically creating UI based on what animations types there are
//    Each animation would be its own card. 
//    For the animations if the property was "speed" then create a slider from 0 to 1
//    For the animations if the property was "colors" then display a color picker for finding list of colors
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
