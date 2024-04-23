import { TestBed } from '@angular/core/testing';

import { ThnService } from './thn.service';

describe('ThnService', () => {
  let service: ThnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
