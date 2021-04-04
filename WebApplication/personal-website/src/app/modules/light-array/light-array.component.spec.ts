import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightArrayComponent } from './light-array.component';

describe('LightArrayComponent', () => {
  let component: LightArrayComponent;
  let fixture: ComponentFixture<LightArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
