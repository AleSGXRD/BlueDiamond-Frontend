import { TestBed } from '@angular/core/testing';

import { PrintContentService } from './print-content.service';

describe('PrintContentService', () => {
  let service: PrintContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
