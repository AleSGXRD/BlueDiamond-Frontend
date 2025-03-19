import { TestBed } from '@angular/core/testing';

import { InvoicePaidApiService } from './invoice-paid-api.service';

describe('InvoicePaidApiService', () => {
  let service: InvoicePaidApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicePaidApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
