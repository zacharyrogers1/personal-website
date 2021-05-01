import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightArrayService {

  constructor() { }

  parseRgbColorFromString(rgb:string):RgbColor{
    const rgbList:string[] = rgb.substring(4, rgb.length-1)
    .replace(/ /g, '')
    .split(',');

    const numberList = rgbList.map((colorString:string) => {
      return parseInt(colorString)
    })

    return numberList as RgbColor
  }
}

export type RgbColor = [number, number, number]
