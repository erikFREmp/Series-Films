import { TestBed } from '@angular/core/testing';

import { GenreDataServiceService } from './genre-data-service.service';

describe('GenreDataServiceService', () => {
  let service: GenreDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
