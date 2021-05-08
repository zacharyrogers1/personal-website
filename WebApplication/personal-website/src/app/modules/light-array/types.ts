import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers/AWSIotProvider";


export interface IColorChangeEvent {
  slider: string,
  color: string
}

//1. Define a static setup of each of the animations and what it needs for forms
//2. Create dynamic forms by grabbing the state of the data first then looping through and dynamically creating UI based on what animations types there are
//    Each animation would be its own card.
//    For the animations if the property was "speed" then create a slider from 0 to 1
//    For the animations if the property was "colors" then display a color picker for finding list of colors
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
  animations: {
    countdown: {
      timeInSeconds: number
    },
    pingPong: {
      speed: number,
      color: RgbColor
    },
    unifiedRainbow: {
      speed: number
    },
    chasingLights: {
      speed: number,
      numLitPixels: number,
      color: RgbColor
    }
  }
}



export type RgbScreen = RgbColor[][]

export interface IColorTile {
  displayName: string;
  index: number;
  color: string
}

export type RgbColor = [number, number, number]

