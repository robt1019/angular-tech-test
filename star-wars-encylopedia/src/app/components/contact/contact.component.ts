import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contact: Observable<Person>;

  constructor(
    private route: ActivatedRoute,
    private starWarsService: StarWarsService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.contact = this.starWarsService.characterById(params.get('id'));
    });
  }

  ngOnInit(): void {}
}
