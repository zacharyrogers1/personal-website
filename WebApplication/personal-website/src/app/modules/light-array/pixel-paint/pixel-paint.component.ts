import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MqttService } from 'src/app/services/mqtt.service';
import { LightArrayService } from '../light-array.service';
import { IColorTile, IPaintPixel, RgbScreen } from '../types';


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
  private readonly individualPublish: boolean = true;
  mouseIsPressed: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private lightArrayService: LightArrayService,
    private mqttService: MqttService
  ) { }

  ngOnInit(): void {

    for (let i = 0; i < this.pixelCount; i++) {
      this.tilesToDisplay.push({ displayName: i.toString(), index: i, color: this.grey })
    }

  }

  touchTile(tileNumber: number) {
    this.tilesToDisplay[tileNumber].color = this.pixelPaintColor;
  }

  panOverTile(evt: any) {
    this.colorPixel1(evt.center.x, evt.center.y)
  }

  colorPixel1(x: number, y: number) {
    const tileElement = document.elementsFromPoint(x, y)[1]; //THe 0th element is a mat figure and we need the mat-tile element
    if (tileElement.id) {
      const tileNumber = tileElement.id;
      this.tilesToDisplay[tileNumber].color = this.pixelPaintColor;
    }
  }

  clearScreen() {
    let clearScreen: IPaintPixel[] = [];
    for (let i = 0; i < this.pixelCount; i++) {
      const coordinate = this.lightArrayService.parseCoordinate(this.xAxisLength, i);
      const coordinateWithColor: IPaintPixel = { ...coordinate, color: [0, 0, 0] };
      clearScreen.push(coordinateWithColor);
      this.tilesToDisplay[i].color = 'rgb(0,0,0)';
    }
    this.mqttService.publishToPixelPaint(clearScreen);
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

