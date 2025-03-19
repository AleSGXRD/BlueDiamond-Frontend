import { TestBed } from '@angular/core/testing';

import { HistoryClientApiManagerService } from './history-client-api-manager.service';

describe('HistoryClientApiManagerService', () => {
  let service: HistoryClientApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryClientApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
