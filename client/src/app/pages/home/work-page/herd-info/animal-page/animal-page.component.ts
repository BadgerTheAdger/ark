import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.scss']
})
export class AnimalPageComponent implements OnInit {
  animal: Animal;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.animal = this.route.snapshot.data.animal;
  }

}
