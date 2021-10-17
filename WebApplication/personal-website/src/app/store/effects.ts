import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { MqttService } from "../services/mqtt.service";
import { FETCH_STATE, SetLightArrayState } from "./actions";

@Injectable()
export class LightArrayEffects {
    constructor(
        private actions$: Actions,
        private mqttService: MqttService
    ) {}

    fetchState$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(FETCH_STATE),
            mergeMap(() => {
                return this.mqttService.getLightArrayState()
            }),
            map((lightArrayState) => new SetLightArrayState(lightArrayState))
        )
    })
}