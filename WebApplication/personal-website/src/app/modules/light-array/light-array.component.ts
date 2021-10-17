import { Component, OnDestroy, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LightArrayService } from './light-array.service';
import { IColorChangeEvent, ILightArrayDesiredState, RgbScreen } from './types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-light-array',
  templateUrl: './light-array.component.html',
  styleUrls: ['./light-array.component.scss']
})
export class LightArrayComponent implements OnInit, OnDestroy {

  lightArrayFormGroup: FormGroup = new FormGroup({
    activeAnimation: new FormControl(''),
    brightness: new FormControl(1),
    color: new FormControl([0, 0, 255]),
    speed: new FormControl(0.1),
    animations: new FormGroup({
      chasingLights: new FormGroup({
        numLitPixels: new FormControl(3),
      }),
    })
  });
  selectedColor = 'rgb(0,0,0)';
  subscriptions: Subscription[] = [];
  deviceConnectionStatus = {color: 'warn', statusText: 'Disconnected'}

  constructor(
    private mqttService: MqttService,
    private lightArrayService: LightArrayService
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.mqttService.getLightArrayState().subscribe((stateDoc) => {
        console.log('component state doc: ', stateDoc);
        this.lightArrayFormGroup.setValue(stateDoc.desired);

        const selectedColor = stateDoc.desired.color;
        this.selectedColor = `rgb(${selectedColor[0]}, ${selectedColor[1]}, ${selectedColor[2]})`;
      })
    );

    this.subscriptions.push(
      this.lightArrayFormGroup.valueChanges.subscribe((desiredState: ILightArrayDesiredState) => {
        console.log('Value of lightArrayFormGroup: ', desiredState);
        this.updateDesiredState(desiredState);
      })
    );

    this.mqttService.subscribeToTopic('$aws/things/stringLights/shadow/update').subscribe((updates) => {
      console.log('update delta topic', updates)
    })
  }

  updateDesiredState(desiredState: Object) {
    this.mqttService.updateDesiredState(desiredState);
  }

  colorChange(event: IColorChangeEvent) {
    const color = this.lightArrayService.parseRgbColorFromString(event.color);
    this.lightArrayFormGroup.get(`color`).setValue(color);
  }

  matTabSelected(tabIndex: number) {
    if (tabIndex == 1) {
      const pixelPaintUpdate = { activeAnimation: 'pixelPaint' }
      this.updateDesiredState(pixelPaintUpdate);
    } else if (tabIndex == 0) {
      this.updateDesiredState(this.lightArrayFormGroup.value);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

