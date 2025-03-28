import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  winRate: number;

  @Column()
  localizedName: string;

  @Column()
  primaryAttr: string;

  @Column()
  attackType: string;

  @Column('simple-array', { array: true })
  roles: string[];

  @Column()
  legs: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
