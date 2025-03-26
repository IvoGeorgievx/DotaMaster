import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../types/hero.type';

@Component({
  selector: 'app-heroes',
  imports: [],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  standalone: true,
})
export class HeroesComponent {
  public heroes: Hero[] = [];
  constructor(private readonly heroesService: HeroService) {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
