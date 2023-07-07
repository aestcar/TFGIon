import { TestBed } from '@angular/core/testing';

import { AutenticacionService } from './autentication.service';

describe('AutenticationService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
