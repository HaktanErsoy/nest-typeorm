import { IsArray, IsString } from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

export class CreatePlayerDto {
  @IsString()
  name: string;

  // @IsArray()
  // games: Game[];
}
