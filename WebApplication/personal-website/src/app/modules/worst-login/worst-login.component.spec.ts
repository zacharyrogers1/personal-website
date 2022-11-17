import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorstLoginComponent } from './worst-login.component';

describe('WorstLoginComponent', () => {
  let component: WorstLoginComponent;
  let fixture: ComponentFixture<WorstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorstLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
