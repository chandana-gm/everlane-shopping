import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { noBackGuard } from './no-back.guard';

describe('noBackGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noBackGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
