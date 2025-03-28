import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroStatsComponent } from './components/hero-stats/hero-stats.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
  {
    path: 'heroes',
    component: HeroStatsComponent,
  },
];
