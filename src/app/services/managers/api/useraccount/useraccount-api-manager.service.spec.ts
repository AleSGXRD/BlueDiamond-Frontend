import { TestBed } from '@angular/core/testing';

import { UseraccountApiManagerService } from './useraccount-api-manager.service';

describe('UseraccountApiManagerService', () => {
  let service: UseraccountApiManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseraccountApiManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
