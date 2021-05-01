import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelPaintComponent } from './pixel-paint.component';

describe('PixelPaintComponent', () => {
  let component: PixelPaintComponent;
  let fixture: ComponentFixture<PixelPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelPaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
