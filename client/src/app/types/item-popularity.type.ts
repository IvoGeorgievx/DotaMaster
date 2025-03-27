import { Hero } from './hero.type';

export interface ItemPopularity {
  hero: Hero;
  startGameItems: Record<string, number>;
  earlyGameItems: Record<string, number>;
  midGameItems: Record<string, number>;
  lateGameItems: Record<string, number>;
}
