import { TestBed } from '@angular/core/testing';

import { ServiceApiManagerService } from './service-api-manager.service';

describe('ServiceApiManagerService', () => {
  let service: ServiceApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
