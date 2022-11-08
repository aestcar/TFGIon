import { TestBed } from '@angular/core/testing';

import { ReservasGuard } from './guard-reservas.guard';

describe('ReservasGuard', () => {
  let guard: ReservasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReservasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
