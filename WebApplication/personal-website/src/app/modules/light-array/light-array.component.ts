import { Component, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LightArrayService } from './light-array.service';
import { IColorChangeEvent, ILightArrayState, RgbScreen } from './types';

@Component({
  selector: 'app-light-array',
  templateUrl: './light-array.component.html',
  styleUrls: ['./light-array.component.scss']
})
export class LightArrayComponent implements OnInit {

  lightArrayFormGroup: FormGroup = new FormGroup({
    activeAnimation: new FormControl(''),
    brightness: new FormControl(1),
    animations: new FormGroup({
      chasingLights: new FormGroup({
        speed: new FormControl(0),
        numLitPixels: new FormControl(3),
        color: new FormControl([0, 0, 255])
      }),
      pingPong: new FormGroup({
        speed: new FormControl(0),
        color: new FormControl([0, 0, 255])
      }),
      unifiedRainbow: new FormGroup({
        speed: new FormControl(0),
      }),
      twinkle: new FormGroup({
        speed: new FormControl(0),
        color: new FormControl([0, 0, 255])
      }),
      scanningStripe: new FormGroup({
        speed: new FormControl(0),
        color: new FormControl([0, 0, 255])
      }),
      fillAndEmpty: new FormGroup({
        speed: new FormControl(0),
        color: new FormControl([0, 0, 255])
      }),
      countdown: new FormGroup({
        timeInSeconds: new FormControl(10),
      })
    })
  });

  chasingLightsColor = 'rgb(0,0,0)';
  pingPongColor = 'rgb(0,0,0)';
  twinkleColor = 'rgb(0,0,0)';
  scanningStripeColor = 'rgb(0,0,0)';
  fillAndEmptyColor = 'rgb(0,0,0)';

  constructor(
    private mqttService: MqttService,
    private lightArrayService: LightArrayService
  ) { }

  ngOnInit() {

    this.mqttService.getDesiredState().subscribe((stateDoc: ILightArrayState) => {
      console.log('component state doc: ', stateDoc);
      this.lightArrayFormGroup.setValue(stateDoc);

      const chasingLightsColor = stateDoc.animations.chasingLights.color;
      this.chasingLightsColor = `rgb(${chasingLightsColor[0]}, ${chasingLightsColor[1]}, ${chasingLightsColor[2]})`;

      const pingPongColor = stateDoc.animations.pingPong.color;
      this.pingPongColor = `rgb(${pingPongColor[0]}, ${pingPongColor[1]}, ${pingPongColor[2]})`;

      const twinkleColor = stateDoc.animations.twinkle.color;
      this.twinkleColor = `rgb(${twinkleColor[0]}, ${twinkleColor[1]}, ${twinkleColor[2]})`;

      const scanningStripeColor = stateDoc.animations.scanningStripe.color;
      this.scanningStripeColor = `rgb(${scanningStripeColor[0]}, ${scanningStripeColor[1]}, ${scanningStripeColor[2]})`;

      const fillAndEmptyColor = stateDoc.animations.scanningStripe.color;
      this.fillAndEmptyColor = `rgb(${fillAndEmptyColor[0]}, ${fillAndEmptyColor[1]}, ${fillAndEmptyColor[2]})`;
    });

    this.lightArrayFormGroup.valueChanges.subscribe((desiredState: ILightArrayState) => {
      console.log('Value of lightArrayFormGroup: ', desiredState);
      this.updateDesiredState(desiredState);
    });

  }

  updateDesiredState(desiredState: Object) {
    this.mqttService.updateDesiredState(desiredState);
  }

  colorChange(event: IColorChangeEvent, animationToApply: string) {
    const color = this.lightArrayService.parseRgbColorFromString(event.color);
    this.lightArrayFormGroup.get(`animations.${animationToApply}.color`).setValue(color);
  }

  matTabSelected(tabIndex: number) {
    if (tabIndex == 1) {
      const pixelPaintUpdate = { activeAnimation: 'pixelPaint' }
      this.updateDesiredState(pixelPaintUpdate);
    } else if (tabIndex == 0) {
      this.updateDesiredState(this.lightArrayFormGroup.value);
    }
  }

}

