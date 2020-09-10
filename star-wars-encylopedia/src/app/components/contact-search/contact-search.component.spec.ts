import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSearchComponent } from './contact-search.component';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { of } from 'rxjs';
import { Person } from 'src/app/models/person.model';

describe('ContactSearchComponent', () => {
  let component: ContactSearchComponent;
  let fixture: ComponentFixture<ContactSearchComponent>;

  const mockResults: Partial<Person>[] = [
    { name: 'Luke Skywalker' },
    { name: 'Chewbacca' },
  ];

  const mockStarWarsService: Partial<StarWarsService> = {
    characterSearch: () => {
      return of(mockResults as Person[]);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactSearchComponent],
      providers: [{ provide: StarWarsService, useValue: mockStarWarsService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
