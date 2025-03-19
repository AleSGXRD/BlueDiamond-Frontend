import { TestBed } from '@angular/core/testing';

import { RolApiManagerService } from './rol-api-manager.service';

describe('RolApiManagerService', () => {
  let service: RolApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
