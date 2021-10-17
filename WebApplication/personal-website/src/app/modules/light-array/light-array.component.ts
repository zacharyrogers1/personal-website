import { Component, OnDestroy, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LightArrayService } from './light-array.service';
import { IColorChangeEvent, IDeltaChanges, ILightArrayDesiredState, RgbScreen } from './types';
import { Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { FetchState } from 'src/app/store/actions';
import { lightArray_desired, lightArray_reported } from 'src/app/store/reducers';
import { filterEmpty } from 'src/app/store/operators';
import { map, take } from 'rxjs/operators';

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
  deviceConnectionStatus$ = this.store$.select(lightArray_reported).pipe(
    map((reportedState) => {
      if(reportedState?.connected) {
        return {color: 'primary', statusText: 'Connected'}
      } else {
        return {color: 'warn', statusText: 'Disconnected'}
      }
    })
  )

  constructor(
    private mqttService: MqttService,
    private lightArrayService: LightArrayService,
    private store$: Store<any>
  ) { }

  ngOnInit() {
    this.store$.dispatch(new FetchState());

    this.subscriptions.push(
      this.lightArrayFormGroup.valueChanges.subscribe((desiredState: ILightArrayDesiredState) => {
        // console.log('Value of lightArrayFormGroup: ', desiredState);
        this.updateDesiredState(desiredState);
      })
    );

    this.store$.select(lightArray_desired).pipe(filterEmpty(), take(1)).subscribe((desiredState) => {
      this.lightArrayFormGroup.patchValue(desiredState, {emitEvent: false});

      const selectedColor = desiredState.color;
      this.selectedColor = `rgb(${selectedColor[0]}, ${selectedColor[1]}, ${selectedColor[2]})`;
    });

  }

  updateDesiredState(desiredState: Object) {
    console.log('Emitting to AWS!!!')
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

