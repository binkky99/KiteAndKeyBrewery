import { TestBed } from '@angular/core/testing';

import { BeerRecipeService } from './beer-recipe.service';

describe('MashProfileHttpService', () => {
  let service: BeerRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
