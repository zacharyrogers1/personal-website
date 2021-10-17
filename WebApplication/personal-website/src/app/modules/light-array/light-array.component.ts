import { Component, OnDestroy, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LightArrayService } from './light-array.service';
import { IColorChangeEvent, IDeltaChanges, ILightArrayDesiredState, RgbScreen } from './types';
import { Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { FetchState } from 'src/app/store/actions';
import { lightArray_desired } from 'src/app/store/reducers';
import { filterEmpty } from 'src/app/store/operators';

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

    this.mqttService.subscribeToTopic('$aws/things/stringLights/shadow/update').subscribe((updates:IDeltaChanges) => {
      if(updates?.value?.state?.reported?.connected === true){
        this.deviceConnectionStatus.color = 'primary';
        this.deviceConnectionStatus.statusText = 'Connected'
      } else if(updates?.value?.state?.reported?.connected === false) {
        this.deviceConnectionStatus.color = 'warn';
        this.deviceConnectionStatus.statusText = 'Disconnected'
      }
    })

    this.store$.select(lightArray_desired).pipe(filterEmpty()).subscribe((desiredState) => {
      console.log('store light array state', desiredState)
      this.lightArrayFormGroup.setValue(desiredState);

      const selectedColor = desiredState.color;
      this.selectedColor = `rgb(${selectedColor[0]}, ${selectedColor[1]}, ${selectedColor[2]})`;
    });

    // timer(10000).pipe(take(1)).subscribe(() => {
    //   console.log('starting to patch value');
    //   this.lightArrayFormGroup.get('activeAnimation').patchValue('twinkle', {emitEvent: false})
    // })
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

