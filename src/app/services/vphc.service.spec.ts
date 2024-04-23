import { TestBed } from '@angular/core/testing';

import { VphcService } from './vphc.service';

describe('VphcService', () => {
  let service: VphcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VphcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
