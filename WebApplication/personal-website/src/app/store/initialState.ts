import { ActionReducerMap } from "@ngrx/store";
import { ILightArrayState } from "src/app/modules/light-array/types";
import { lightArrayReducer } from "./reducers";

export interface IAppState {
    lightArrayState: ILightArrayState
}

export const initialAppState: IAppState = {
    lightArrayState: {
        desired: undefined,
        reported: undefined
    }
}

export const reducers: ActionReducerMap<IAppState> = {
    lightArrayState: lightArrayReducer
};