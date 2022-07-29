import { TestBed } from '@angular/core/testing';

import { HomeOverGuard } from './home-over.guard';

describe('HomeOverGuard', () => {
  let guard: HomeOverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeOverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
