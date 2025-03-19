import { TestBed } from '@angular/core/testing';

import { ServiceItemApiService } from './service-item-api.service';

describe('ServiceItemApiService', () => {
  let service: ServiceItemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
