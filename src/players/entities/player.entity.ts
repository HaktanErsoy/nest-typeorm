import { Game } from 'src/games/entities/game.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game)
  @JoinTable()
  games!: Game[];
}
