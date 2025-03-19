import { TestBed } from '@angular/core/testing';

import { InvoicePaidApiManagerService } from './invoice-paid-api-manager.service';

describe('InvoicePaidApiManagerService', () => {
  let service: InvoicePaidApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicePaidApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
