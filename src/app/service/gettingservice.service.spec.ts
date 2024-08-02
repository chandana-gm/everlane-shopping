import { TestBed } from '@angular/core/testing';

import { GettingserviceService } from './gettingservice.service';

describe('GettingserviceService', () => {
  let service: GettingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
