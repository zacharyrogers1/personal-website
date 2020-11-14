import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseWaterAppComponent } from './horse-water-app.component';

describe('HorseWaterAppComponent', () => {
  let component: HorseWaterAppComponent;
  let fixture: ComponentFixture<HorseWaterAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorseWaterAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseWaterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
