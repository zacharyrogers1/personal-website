import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { IColorChangeEvent } from '../light-array.component';
import { LightArrayService } from '../light-array.service';


@Component({
  selector: 'app-pixel-paint',
  templateUrl: './pixel-paint.component.html',
  styleUrls: ['./pixel-paint.component.scss']
})
export class PixelPaintComponent implements OnInit {
  xAxisLength: number = 10;
  pixelCount:number = 50;
  tilesToDisplay: IColorTile[] = [];
  pixelPaintColor = 'rgb(0,255,0)'


  constructor(
    private lightArrayService: LightArrayService
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.pixelCount; i++) {
      this.tilesToDisplay.push({ displayName: i.toString(), index: i , color: this.pixelPaintColor})
    }
  }
  gridTileMouseOver(index: number) {
    console.log(index)
    this.tilesToDisplay[index].color = this.pixelPaintColor;
  }

  colorChange(event: IColorChangeEvent) {
    const color = this.lightArrayService.parseRgbColorFromString(event.color);
    console.log("I am new pixel paint color: ", this.pixelPaintColor)
  }


  //   def translate2DPointTo1DPosition(x, y, xAxisLength):
  // # The direction the light starts moving first is x direction
  //     if(y%2 == 0):
  //         oneDValue = y*xAxisLength + x
  //     else:
  //         oneDValue = (y+1)*xAxisLength - (x+1)
  //     return oneDValue

}

export interface IColorTile {
  displayName: string;
  index: number;
  color: string
}
