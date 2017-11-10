import { TestBed, inject } from '@angular/core/testing';

import { FetchMongodbDataService } from './fetch-mongodb-data.service';

describe('FetchMongodbDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchMongodbDataService]
    });
  });

  it('should be created', inject([FetchMongodbDataService], (service: FetchMongodbDataService) => {
    expect(service).toBeTruthy();
  }));
});
