import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StarWarsService } from './star-wars.service';

describe('StarWarsService', () => {
  let service: StarWarsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StarWarsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('characterSearch', () => {
    it('should call swapi correctly', () => {
      service.characterSearch('chew').subscribe();
      httpController.expectOne(`https://swapi.dev/api/people/?search=chew`);
    });

    it('should map response to person model correctly', (done) => {
      service.characterSearch('chew').subscribe((result) => {
        expect(result).toEqual([
          {
            id: '13',
            name: 'Chewbacca',
            height: 228,
            birthYear: '200BBY',
            gender: 'male',
          },
        ]);
        done();
      });
      httpController
        .expectOne(`https://swapi.dev/api/people/?search=chew`)
        .flush({
          results: [
            {
              name: 'Chewbacca',
              height: '228',
              mass: '112',
              hair_color: 'brown',
              skin_color: 'unknown',
              eye_color: 'blue',
              birth_year: '200BBY',
              gender: 'male',
              url: 'http://swapi.dev/api/people/13/',
            },
          ],
        });
    });
  });

  describe('characterById', () => {
    it('should call swapi correctly', () => {
      service.characterById('13').subscribe();
      httpController.expectOne(`https://swapi.dev/api/people/13`);
    });

    it('should map response to person model correctly', (done) => {
      service.characterById('13').subscribe((result) => {
        expect(result).toEqual({
          id: '13',
          name: 'Chewbacca',
          height: 228,
          birthYear: '200BBY',
          gender: 'male',
        });
        done();
      });
      httpController.expectOne(`https://swapi.dev/api/people/13`).flush({
        name: 'Chewbacca',
        height: '228',
        mass: '112',
        hair_color: 'brown',
        skin_color: 'unknown',
        eye_color: 'blue',
        birth_year: '200BBY',
        gender: 'male',
        url: 'http://swapi.dev/api/people/13/',
      });
    });
  });
});
