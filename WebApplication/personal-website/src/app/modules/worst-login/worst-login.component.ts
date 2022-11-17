import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-worst-login',
  templateUrl: './worst-login.component.html',
  styleUrls: ['./worst-login.component.scss']
})
export class WorstLoginComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  currentFocus: 'username' | 'password' = 'username';
  successMessage = '';
  loginButtonText = 'Login'

  constructor(
  ) {

  }

  ngOnInit() {
    this.changeFocusListener();
  }

  ngAfterViewInit() {

  }

  login() {

    const formValues = this.loginForm.value;
    if(formValues.username === 'user' && formValues.password === 'pass') {
      this.successMessage = 'YOU LOGGED IN'
    } else {
      this.loginButtonText = 'Nope. Try Again Loser';
      this.loginForm.reset();
    }

  }

  private changeFocusListener() {
    this.loginForm.valueChanges.subscribe((value) => {
      if(this.currentFocus === 'username') {
        this.currentFocus = 'password';
        this.passwordInput.nativeElement.focus();
      } else {
        this.currentFocus = 'username';
        this.usernameInput.nativeElement.focus();
      }
    });
  }

}
