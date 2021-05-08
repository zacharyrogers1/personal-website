import { TestBed } from '@angular/core/testing';

import { LightArrayService } from './light-array.service';

describe('LightArrayService', () => {
  let service: LightArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convertIndexToPixelIndex', () => {
    it('Scenario1', () => {
      const xAxisLength = 10;
      const index = 7;

      expect(service.convertIndexToPixelIndex(xAxisLength, index)).toBe(7);
    });
    it('Scenario2', () => {
      const xAxisLength = 10;
      const index = 10;

      expect(service.convertIndexToPixelIndex(xAxisLength, index)).toBe(19);
    });
    it('Scenario3', () => {
      const xAxisLength = 10;
      const index = 13;

      expect(service.convertIndexToPixelIndex(xAxisLength, index)).toBe(16);
    });
  });
});

// xxxxxxxxxx
// xxxxxxxxxx
