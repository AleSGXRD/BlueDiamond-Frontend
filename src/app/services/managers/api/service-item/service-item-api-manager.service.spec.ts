import { TestBed } from '@angular/core/testing';

import { ServiceItemApiManagerService } from './service-item-api-manager.service';

describe('ServiceItemApiManagerService', () => {
  let service: ServiceItemApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceItemApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
