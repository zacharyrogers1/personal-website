import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { LightArrayService } from '../light-array.service';
import { IColorTile, IPixelPaintUpdate, RgbScreen } from '../types';


@Component({
  selector: 'app-pixel-paint',
  templateUrl: './pixel-paint.component.html',
  styleUrls: ['./pixel-paint.component.scss']
})
export class PixelPaintComponent implements OnInit, OnDestroy {
  xAxisLength: number = 10;
  pixelCount: number = 50;
  tilesToDisplay: IColorTile[] = [];
  pixelPaintColor = 'rgb(0,0,0)'
  private readonly grey: string = 'rgb(200,200,200)';
  private readonly individualPublish: boolean = false;
  mouseIsPressed: boolean = false;
  subscriptions: Subscription[] = [];

  @Output() paintScreen = new EventEmitter<RgbScreen>();

  constructor(
    private lightArrayService: LightArrayService
  ) { }

  ngOnInit(): void {

    if (this.individualPublish) {
      for (let i = 0; i < this.pixelCount; i++) {
        const translatedIndex = this.lightArrayService.convertIndexToPixelIndex(this.xAxisLength, i);
        this.tilesToDisplay.push({ displayName: i.toString(), index: translatedIndex, color: this.grey })
      }
    } else {
      for (let i = 0; i < this.pixelCount; i++) {
        this.tilesToDisplay.push({ displayName: i.toString(), index: i, color: this.grey })
      }
    }

    this.subscriptions.push(
      fromEvent(document, 'mousedown').subscribe(() => {
        this.mouseIsPressed = true;
      })
    )
    this.subscriptions.push(
      fromEvent(document, 'mouseup').subscribe(() => {
        this.mouseIsPressed = false;
      })
    )
  }



  gridTileMouseOver(index: number, override: boolean) {
    if (this.individualPublish && (this.mouseIsPressed || override)) {
      // this.tilesToDisplay[index].color = this.pixelPaintColor;
      console.log("I am index: ", index);
      // const thingToPublish: IPixelPaintUpdate = {
      //   color: this.lightArrayService.parseRgbColorFromString(this.tilesToDisplay[i].color),
      //   index: index
      // }
    }

    if (this.mouseIsPressed || override) {
      this.tilesToDisplay[index].color = this.pixelPaintColor;
      this.paintScreen.emit(this.generateScreen());
    }
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

