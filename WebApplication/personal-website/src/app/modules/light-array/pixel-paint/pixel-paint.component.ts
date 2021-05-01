import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { IColorChangeEvent } from '../light-array.component';
import { LightArrayService, RgbColor } from '../light-array.service';


@Component({
  selector: 'app-pixel-paint',
  templateUrl: './pixel-paint.component.html',
  styleUrls: ['./pixel-paint.component.scss']
})
export class PixelPaintComponent implements OnInit {
  xAxisLength: number = 10;
  pixelCount: number = 50;
  tilesToDisplay: IColorTile[] = [];
  pixelPaintColor = 'rgb(0,0,0)'
  private readonly white: string = 'rgb(200,200,200)'
  mouseIsPressed: boolean = false;

  @Output() paintScreen = new EventEmitter<RgbScreen>();

  constructor(
    private lightArrayService: LightArrayService
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.pixelCount; i++) {
      this.tilesToDisplay.push({ displayName: i.toString(), index: i, color: this.white })
    }
  }

  gridTileMouseOver(index: number, override:boolean) {
    if (this.mouseIsPressed || override) {
      this.tilesToDisplay[index].color = this.pixelPaintColor;
      this.paintScreen.emit(this.generateScreen());
    }
  }

  mouseDown(event) {
    console.log('mouseDown', event)
  }

  generateScreen(): RgbScreen {
    let screen: RgbScreen = this.lightArrayService.createBlankScreen(this.xAxisLength, this.pixelCount);
    for (let i = 0; i < this.pixelCount; i++) {
      const x = i % this.xAxisLength;
      const y = Math.floor(i / this.xAxisLength);
      const colorOfTile = this.lightArrayService.parseRgbColorFromString(this.tilesToDisplay[i].color);
      screen[x][y] = colorOfTile
    }

    return screen
  }

  setMousePosition(mouseIsPressed: boolean): void {
    this.mouseIsPressed = mouseIsPressed
  }


  // for (let i = 0; i < this.tilesToDisplay.length/this.xAxisLength; i++) {
  //   screen.push([]);
  //   for (let j = 0; j < this.xAxisLength; j++) {
  //     const colorOfSquare = this.lightArrayService.parseRgbColorFromString()
  //     screen.push()

  //   }

  // }

  // return screen;



  //   def translate2DPointTo1DPosition(x, y, xAxisLength):
  // # The direction the light starts moving first is x direction
  //     if(y%2 == 0):
  //         oneDValue = y*xAxisLength + x
  //     else:
  //         oneDValue = (y+1)*xAxisLength - (x+1)
  //     return oneDValue


}

export type RgbScreen = RgbColor[][]

export interface IColorTile {
  displayName: string;
  index: number;
  color: string
}

const example: RgbScreen = [
  [[255, 255, 255], [200, 200, 200]],
  []
]
