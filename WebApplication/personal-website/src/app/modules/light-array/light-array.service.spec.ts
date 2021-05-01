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
});
