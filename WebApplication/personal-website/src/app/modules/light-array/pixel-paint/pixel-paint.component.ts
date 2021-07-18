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
  xAxisLength: number = 20;
  pixelCount: number = 400;
  tilesToDisplay: IColorTile[] = [];
  pixelPaintColor = 'rgb(0,0,0)';
  private readonly grey: string = 'rgb(200,200,200)';
  subscriptions: Subscription[] = [];
  isFullScreen:boolean = false;

  constructor(
    private lightArrayService: LightArrayService,
    private mqttService: MqttService
  ) { }

  ngOnInit() {
    for (let i = 0; i < this.pixelCount; i++) {
      this.tilesToDisplay.push({ displayName: i.toString(), index: i, color: this.grey });
    }
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    const pixelPaintElement = document.getElementById("pixelPaintContainer")
    if(!document.fullscreenElement){
      pixelPaintElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  touchTile(tileNumber: number) {
    this.tilesToDisplay[tileNumber].color = this.pixelPaintColor;
    this.publishToPixelPaint(tileNumber, this.pixelPaintColor);
  }

  panOverTile(evt: any) {
    this.colorPixel1(evt.center.x, evt.center.y);
  }

  colorPixel1(xScreen: number, yScreen: number) {
    const tileElement = document.elementsFromPoint(xScreen, yScreen)[1]; //THe 0th element is a mat figure and we need the mat-tile element
    if (tileElement.id) {
      const tileNumber = tileElement.id;
      this.tilesToDisplay[tileNumber].color = this.pixelPaintColor;
      this.publishToPixelPaint(parseInt(tileNumber), this.pixelPaintColor);
    }
  }

  publishToPixelPaint(index: number, color: string) {
    const rgbColor = this.lightArrayService.parseRgbColorFromString(color);
    const coordinate = this.lightArrayService.parseCoordinate(this.xAxisLength, index);
    this.mqttService.publishToPixelPaint([{ color: rgbColor, ...coordinate }]);
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

