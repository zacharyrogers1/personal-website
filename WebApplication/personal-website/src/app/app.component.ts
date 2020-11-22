import { Component, OnInit } from '@angular/core';
import { Hub } from 'aws-amplify';
import { AuthService } from './services/auth.service';
import { MqttService } from './services/mqtt.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private mqttService: MqttService
  ) {

  }

  ngOnInit() {
    this.authService.isCurrentUserLoggedIn().then((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        this.mqttService.addPluggable();
      }
    });

    this.createListenerToAddIoTPluginOnSignIn();
  }

  private createListenerToAddIoTPluginOnSignIn() {
    Hub.listen('auth', (data) => {
      if (data?.payload?.event === 'signIn') {
        this.mqttService.addPluggable();
      }
      console.log("Here is information on auth", data);
    });
  }
}