import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers/AWSIotProvider";


export interface IColorChangeEvent {
  slider: string,
  color: string
}
export interface IDeltaChanges {
  provider: AWSIoTProvider
  value: {
    metadata: Object
    state: Partial<ILightArrayState>
    timestamp: number
    version: number
    'Symbol(topic)': string
  }
}

export interface ILightArrayDesiredState {
  activeAnimation: string;
  brightness: number;
  color: RgbColor;
  speed: number;
  animations: {
    chasingLights: {
      numLitPixels: number,
    }
  };
}

export interface ILightArrayReportedState extends ILightArrayDesiredState {
  connected: boolean;
  numPixels: number;
  xAxisLength: number;
}

export interface ILightArrayState {
  desired: ILightArrayDesiredState;
  reported: ILightArrayReportedState;
}

export type RgbScreen = RgbColor[][]

export interface IColorTile {
  displayName: string;
  index: number;
  color: string
}

export interface IPixelPaintUpdate {
  index: number;
  color: RgbColor;
}

export interface IPaintPixel {
  x: number;
  y: number;
  color: RgbColor;
}

export type RgbColor = [number, number, number]

