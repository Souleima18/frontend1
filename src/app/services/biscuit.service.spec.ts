import { TestBed } from '@angular/core/testing';

import { BiscuitService } from './biscuit.service';

describe('BiscuitService', () => {
  let service: BiscuitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiscuitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
