import { ILightArrayDesiredState, ILightArrayState } from "src/app/modules/light-array/types";
import { IPayloadAction } from "./reducers";

export const SET_LIGHT_ARRAY_STATE = '[lightArray] Set State';
export const SET_LIGHT_ARRAY_DESIRED_STATE = '[lightArray] Set Desired State';
export const FETCH_STATE = '[lightArray] Fetch State';

export class SetLightArrayState implements IPayloadAction {
    type = SET_LIGHT_ARRAY_STATE
    constructor(public payload: ILightArrayState) {}
}

export class SetLightArrayDesiredState implements IPayloadAction {
    type = SET_LIGHT_ARRAY_STATE
    constructor(public payload: ILightArrayDesiredState) {}
}

export class FetchState implements IPayloadAction {
    type = FETCH_STATE
}