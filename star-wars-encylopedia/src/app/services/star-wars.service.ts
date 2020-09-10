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
            id: r.url.split('/')[r.url.split('/').length - 2],
            name: r.name,
            height: parseInt(r.height, 10),
            birthYear: r.birth_year,
            gender: r.gender,
          }))
        )
      );
  }

  public characterById(id: string): Observable<Person> {
    return this.http.get<any>(`https://swapi.dev/api/people/${id}`).pipe(
      map((response) => ({
        id: response.url.split('/')[response.url.split('/').length - 2],
        name: response.name,
        height: parseInt(response.height, 10),
        birthYear: response.birth_year,
        gender: response.gender,
      }))
    );
  }
}
