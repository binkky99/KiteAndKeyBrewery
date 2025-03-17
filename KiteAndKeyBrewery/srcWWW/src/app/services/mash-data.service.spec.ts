import { TestBed } from '@angular/core/testing';

import { MashDataService } from './mash-data.service';

describe('MashProfileHttpService', () => {
  let service: MashDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MashDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
