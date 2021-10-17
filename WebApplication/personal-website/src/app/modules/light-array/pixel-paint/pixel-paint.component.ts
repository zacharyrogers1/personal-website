import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { MqttService } from 'src/app/services/mqtt.service';
import { LightArrayService } from '../light-array.service';
import { IColorTile, IPaintPixel, RgbColor } from '../types';


@Component({
  selector: 'app-pixel-paint',
  templateUrl: './pixel-paint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pixel-paint.component.scss']
})
export class PixelPaintComponent implements OnInit, OnDestroy, AfterViewInit {
  xAxisLength: number = 20;
  pixelCount: number = 400;
  tilesToDisplay: IColorTile[] = [];
  pixelPaintColor = 'rgb(0,0,0)';
  private readonly grey: string = 'rgb(200,200,200)';
  subscriptions: Subscription[] = [];
  isFullScreen: boolean = false;
  colorStream: Subject<{ x: number, y: number }> = new Subject();
  currentRotation: number = 0;
  colorStreamEffects$: Observable<any> = this.colorStream.pipe(
    map(({ x, y }) => document.elementsFromPoint(x, y)[1].id),//THe 0th element is a mat figure and we need the mat-tile element),
    filter((id: string) => id && (id !== 'paintTiles')),
    distinctUntilChanged(),
    tap((id: string) => {
      this.tilesToDisplay[id].color = this.pixelPaintColor;
      this.changeDetectorRef.detectChanges()
      this.publishToPixelPaint(parseInt(id), this.pixelPaintColor);
    }),
    catchError((err, caught) => caught)
  );
  resizePixelPaint$: Observable<any> = fromEvent(window, 'resize').pipe(
    tap((event) => {
      this.resizePixelPaint();
    })
  )

  constructor(
    private lightArrayService: LightArrayService,
    private mqttService: MqttService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.changeDetectorRef.detach();
    for (let i = 0; i < this.pixelCount; i++) {
      this.tilesToDisplay.push({ displayName: i.toString(), index: i, color: this.grey });
    }
    this.subscriptions.push(this.colorStreamEffects$.subscribe());

    this.subscriptions.push(this.resizePixelPaint$.subscribe());
  }
  
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges()
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    const pixelPaintElement = document.getElementById("pixelPaintContainer")
    if (!document.fullscreenElement) {
      pixelPaintElement.requestFullscreen().then(() => {
        this.changeDetectorRef.detectChanges()
      });
    } else {
      document.exitFullscreen().then(() => {
        this.changeDetectorRef.detectChanges()
      });
    }
  }

  touchTile(tileNumber: number) {
    this.tilesToDisplay[tileNumber].color = this.pixelPaintColor;
    this.changeDetectorRef.detectChanges();
    this.publishToPixelPaint(tileNumber, this.pixelPaintColor);
  }

  panOverTile(evt: any) {
    this.colorStream.next({ x: evt.center.x, y: evt.center.y })
  }

  publishToPixelPaint(index: number, color: string) {
    const rgbColor = this.lightArrayService.parseRgbColorFromString(color);
    const coordinate = this.lightArrayService.parseCoordinate(this.xAxisLength, index);
    this.mqttService.publishToPixelPaint([{ color: rgbColor, ...coordinate }]);
  }

  clearScreen() {
    this.fillScreenWithColor([0,0,0])
  }

  fillScreenWithActiveColor() {
    const activeColor = this.lightArrayService.parseRgbColorFromString(this.pixelPaintColor);
    this.fillScreenWithColor(activeColor);
  }

  fillScreenWithColor(color: RgbColor) {
    let screen: IPaintPixel[] = [];
    for (let i = 0; i < this.pixelCount; i++) {
      const coordinate = this.lightArrayService.parseCoordinate(this.xAxisLength, i);
      const coordinateWithColor: IPaintPixel = { ...coordinate, color };
      screen.push(coordinateWithColor);
      this.tilesToDisplay[i].color = `rgb(${color[0]},${color[1]},${color[2]})`;
    }
    this.mqttService.publishToPixelPaint(screen);
    this.changeDetectorRef.detectChanges();
  }

  runChangeDetection() {
    this.changeDetectorRef.detectChanges();
  }

  rotate(degrees: number) {
    this.currentRotation = this.currentRotation + degrees;
    const paintTiles = document.getElementById("paintTiles");
    paintTiles.style.transform = `rotate(${this.currentRotation}deg)`;
    this.resizePixelPaint();
  }

  resizePixelPaint() {
    const paintContainer = document.getElementById('paintTiles');
    if (paintContainer) {
      const matCardMarginSize = 16;
      const matCardTitleHeight = 31;
      const matCardTitlePadding = 8;
      const actualWidth: number = window.innerWidth - (matCardMarginSize * 2)
      const actualHeight: number = window.innerHeight - (matCardMarginSize * 2) - matCardTitleHeight - matCardTitlePadding
      const smallerValue: number = actualWidth >= actualHeight ? actualHeight : actualWidth;
      paintContainer.style.height = smallerValue + 'px';
      paintContainer.style.width = smallerValue + 'px';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

