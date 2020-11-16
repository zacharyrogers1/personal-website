import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInStatusComponent } from './sign-in-status.component';

describe('SignInStatusComponent', () => {
  let component: SignInStatusComponent;
  let fixture: ComponentFixture<SignInStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
