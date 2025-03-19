import { TestBed } from '@angular/core/testing';

import { ClientApiManagerService } from './client-api-manager.service';

describe('ClientApiManagerService', () => {
  let service: ClientApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
