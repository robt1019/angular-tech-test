import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let starWarsService: StarWarsService;

  const mockActivatedRoute = {
    paramMap: of({
      get: () => '1',
    } as Partial<ParamMap>),
  };

  const mockResult: Person = {
    id: '1',
    name: 'Luke Skywalker',
    height: 172,
    birthYear: '19BBY',
    gender: 'male',
  };

  const mockStarWarsService: Partial<StarWarsService> = {
    characterById: () => {
      return of(mockResult);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: StarWarsService, useValue: mockStarWarsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    starWarsService = TestBed.get(StarWarsService);
    spyOn(starWarsService, 'characterById').and.callThrough();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the star wars service correctly based on the person Id', () => {
    expect(starWarsService.characterById).toHaveBeenCalledWith('1');
  });

  it('should populate the ui correctly based on the result', () => {
    expect(
      fixture.debugElement.query(By.css('.contact__name')).nativeElement
        .innerHTML
    ).toEqual('Luke Skywalker');
  });
});
