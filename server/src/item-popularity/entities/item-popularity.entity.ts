import { Hero } from 'src/heroes/entities/hero.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemPopularity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hero)
  @JoinColumn({ name: 'heroId' })
  hero: Hero;

  @Column('simple-json')
  startGameItems: Record<string, number>;

  @Column('simple-json')
  earlyGameItems: Record<string, number>;

  @Column('simple-json')
  midGameItems: Record<string, number>;

  @Column('simple-json')
  lateGameItems: Record<string, number>;
}
