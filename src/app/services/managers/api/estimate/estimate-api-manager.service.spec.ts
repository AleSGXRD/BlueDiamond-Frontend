import { TestBed } from '@angular/core/testing';

import { EstimateApiManagerService } from './estimate-api-manager.service';

describe('EstimateApiManagerService', () => {
  let service: EstimateApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimateApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
