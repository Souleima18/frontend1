import { TestBed } from '@angular/core/testing';

import { BiscuitGuard } from './biscuit.guard';

describe('BiscuitGuard', () => {
  let guard: BiscuitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BiscuitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
