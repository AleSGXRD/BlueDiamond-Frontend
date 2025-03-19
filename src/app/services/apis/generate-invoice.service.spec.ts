import { TestBed } from '@angular/core/testing';

import { GenerateInvoiceService } from './generate-invoice.service';

describe('GenerateInvoiceService', () => {
  let service: GenerateInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
