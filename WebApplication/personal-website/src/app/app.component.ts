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
    Hub.listen('auth', (data) => {
      if(data?.payload?.event === 'signOut' || data?.payload?.event === 'signIn') {
        this.mqttService.removePluggables()
        this.mqttService.addPluggable();
      }
      console.log("Here is information on auth", data)
    })
    
  }
}