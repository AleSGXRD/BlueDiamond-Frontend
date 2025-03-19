import { TestBed } from '@angular/core/testing';

import { NavigationMobileService } from './navigation-mobile.service';

describe('NavigationMobileService', () => {
  let service: NavigationMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
