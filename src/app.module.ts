import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { GamesModule } from './games/games.module';
import { Player } from './players/entities/player.entity';
import { Game } from './games/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Player, Game],
      synchronize: true,
    }),
    PlayersModule,
    GamesModule,
  ],
})
export class AppModule {}
