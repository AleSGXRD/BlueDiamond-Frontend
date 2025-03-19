import { TestBed } from '@angular/core/testing';

import { UseraccountApiService } from './useraccount-api.service';

describe('AccountApiService', () => {
  let service: UseraccountApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseraccountApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
