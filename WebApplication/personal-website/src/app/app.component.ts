import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-website';

  sliderValue=0;
  sliderMin = 0;
  sliderMax = 180;
  sliderTickInterval = 10;
  showThumbLabel = true;
  

  setTo5(){
    this.sliderValue = 5;
  }

  setTo180(){
    this.sliderValue = 180;
  }

  whatToDoWhenValueChanges(event) {
    console.log(event);
    console.log("here is the value!", event.value);
  }
}
