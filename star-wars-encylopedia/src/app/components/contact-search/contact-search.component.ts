import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css'],
})
export class ContactSearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({ searchTerm: new FormControl('') });

  results: Observable<Person[]>;

  constructor(private starwarsService: StarWarsService) {}

  search(searchTerm) {
    this.results = this.starwarsService.characterSearch(searchTerm);
  }

  ngOnInit(): void {}
}
