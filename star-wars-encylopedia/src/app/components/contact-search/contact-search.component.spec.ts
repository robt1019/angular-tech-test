import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSearchComponent } from './contact-search.component';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { of } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { take } from 'rxjs/operators';
import { By } from '@angular/platform-browser';

describe('ContactSearchComponent', () => {
  let component: ContactSearchComponent;
  let fixture: ComponentFixture<ContactSearchComponent>;
  let starWarsService: StarWarsService;

  const mockResults: Partial<Person>[] = [
    { name: 'Luke Skywalker' },
    { name: 'Chewbacca' },
  ];

  const mockStarWarsService: Partial<StarWarsService> = {
    characterSearch: () => of(mockResults as Person[]),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactSearchComponent],
      providers: [{ provide: StarWarsService, useValue: mockStarWarsService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSearchComponent);
    starWarsService = TestBed.get(StarWarsService);
    spyOn(starWarsService, 'characterSearch').and.callThrough();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call star wars service correctly to get person info', () => {
    component.search('chew');
    expect(starWarsService.characterSearch).toHaveBeenCalledWith('chew');
  });

  it('should populate list of results correctly', (done) => {
    component.search('chew');
    fixture.detectChanges();
    component.results.pipe(take(1)).subscribe((results) => {
      expect(results).toEqual(mockResults as Person[]);
      expect(
        fixture.debugElement.queryAll(By.css('.contact-search__contact')).length
      ).toEqual(2);
      done();
    });
  });
});
