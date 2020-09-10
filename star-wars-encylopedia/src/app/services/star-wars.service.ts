import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  constructor(private http: HttpClient) {}

  public characterSearch(searchTerm: string): Observable<Person[]> {
    return this.http
      .get<{ results: any[] }>(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      )
      .pipe(
        map((response) =>
          response.results.map((r) => ({
            name: r.name,
            height: parseInt(r.height, 10),
            birthYear: r.birth_year,
            gender: r.gender,
          }))
        )
      );
  }
}
