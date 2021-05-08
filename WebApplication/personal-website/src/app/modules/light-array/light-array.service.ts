import { Injectable } from '@angular/core';
import { RgbColor, RgbScreen } from './types';

@Injectable({
  providedIn: 'root'
})
export class LightArrayService {

  constructor() { }

  parseRgbColorFromString(rgb: string): RgbColor {
    const rgbList: string[] = rgb.substring(4, rgb.length - 1)
      .replace(/ /g, '')
      .split(',');

    const numberList = rgbList.map((colorString: string) => {
      return parseInt(colorString)
    })

    return numberList as RgbColor
  }

  createBlankScreen(xAxisLength: number, numPixels: number): RgbScreen {
    let screen: RgbScreen = [];
    for (let i = 0; i < xAxisLength; i++) {
      screen.push([]); //Add all y columns
      for (let j = 0; j < numPixels / xAxisLength; j++) {
        screen[i].push([0, 0, 0])
      }
    };

    return screen
  }
}

