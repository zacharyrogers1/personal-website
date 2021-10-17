import { ActionReducerMap } from "@ngrx/store";
import { ILightArrayState } from "src/app/modules/light-array/types";
import { lightArrayReducer } from "./reducers";

export interface IAppState {
    lightArray: ILightArrayState
}

export const initialAppState: IAppState = {
    lightArray: {
        desired: undefined,
        reported: undefined
    }
}

export const reducers: ActionReducerMap<IAppState> = {
    lightArray: lightArrayReducer
};