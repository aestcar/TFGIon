import { TestBed } from '@angular/core/testing';

import { StorageAndroidService } from './storage-android.service';

describe('StorageAndroidService', () => {
  let service: StorageAndroidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageAndroidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
