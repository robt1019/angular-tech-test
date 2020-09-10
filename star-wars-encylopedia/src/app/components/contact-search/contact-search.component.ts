import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css'],
})
export class ContactSearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({ searchTerm: new FormControl('') });

  constructor(private starwarsService: StarWarsService) {}

  ngOnInit(): void {}
}
