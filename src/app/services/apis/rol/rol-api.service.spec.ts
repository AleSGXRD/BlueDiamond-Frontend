import { TestBed } from '@angular/core/testing';

import { RolApiService } from './rol-api.service';

describe('RolApiService', () => {
  let service: RolApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
