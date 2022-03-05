import { IsString } from 'class-validator';

export class AddGameToPlayerDto {
  @IsString()
  playerId: number;

  @IsString()
  gameId: number;
}
