import { TestBed } from '@angular/core/testing';

import { CsudService } from './csud.service';

describe('CsudService', () => {
  let service: CsudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
