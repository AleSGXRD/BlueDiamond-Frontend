import { TestBed } from '@angular/core/testing';

import { HistoryClientApiService } from './history-client-api.service';

describe('HistoryClientApiService', () => {
  let service: HistoryClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
