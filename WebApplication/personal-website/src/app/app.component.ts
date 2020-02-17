import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-website';

  gaugeType = 'full';
  gaugeValue = 30;
  gaugeLabel = 'Blinds Position';
  gaugeAppendText = 'degrees';
  gaugeMin = 0;
  gaugeMax = 180;

  setTo5(){
    this.gaugeValue = 5;
  }

  setTo180(){
    this.gaugeValue = 180;
  }
}
