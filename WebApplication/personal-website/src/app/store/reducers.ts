import { Action } from "@ngrx/store";
import { ILightArrayState } from "src/app/modules/light-array/types";
import { SET_LIGHT_ARRAY_DESIRED_STATE, SET_LIGHT_ARRAY_STATE } from "./actions";
import { IAppState } from "./initialState";

export interface IPayloadAction extends Action {
    type: string;
    payload?: any
}

export function lightArrayReducer(state: ILightArrayState, action: IPayloadAction): ILightArrayState {
    switch (action.type) {
        case SET_LIGHT_ARRAY_STATE:
            return action.payload
        case SET_LIGHT_ARRAY_DESIRED_STATE:
            return {
                ...state,
                desired: action.payload
            }
        default:
            return state
    }
}

export const lightArray_desired = (state: IAppState) => state.lightArray.desired;
export const lightArray_reported = (state: IAppState) => state.lightArray.reported;
