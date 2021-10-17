import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { merge } from "rxjs";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { ILightArrayState } from "../modules/light-array/types";
import { MqttService } from "../services/mqtt.service";
import { FETCH_STATE, HandleShadowUpdateChange, HANDLE_SHADOW_UPDATE_CHANGE, SetLightArrayState } from "./actions";
import { IPayloadAction, lightArray } from "./reducers";

@Injectable()
export class LightArrayEffects {
    constructor(
        private actions$: Actions,
        private mqttService: MqttService,
        private store$: Store<any>
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

    handleShadowUpdateChange$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(HANDLE_SHADOW_UPDATE_CHANGE),
            withLatestFrom(this.store$.select(lightArray)),
            map(([action, lightArrayState]: [HandleShadowUpdateChange, ILightArrayState]) => {
                const modifiableLightArrayState = JSON.parse(JSON.stringify(lightArrayState))
                dictLoopAndReplace(action.payload, modifiableLightArrayState);
                return new SetLightArrayState(modifiableLightArrayState)
            })
        )
    })
}

function dictLoopAndReplace(subDict, containingDict) {
    for(const [key, value] of Object.entries(subDict)) {
        if (typeof value === 'object') {
            dictLoopAndReplace(value, containingDict[key])
        } else {
            containingDict[key] = value
        }
    }
}