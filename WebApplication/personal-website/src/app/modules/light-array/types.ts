import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers/AWSIotProvider";


export interface IColorChangeEvent {
  slider: string,
  color: string
}
export interface IDeltaChanges {
  provider: AWSIoTProvider
  value: {
    metadata: Object
    state: ILightArrayState
    timestamp: number
    version: number
    'Symbol(topic)': string
  }
}

export interface ILightArrayState {
  activeAnimation: string,
  color: RgbColor;
  speed: number;
  animations: {
    chasingLights: {
      numLitPixels: number,
    }
  };
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

