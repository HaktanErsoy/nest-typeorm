import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Repository } from 'typeorm';
import { AddGameToPlayerDto } from './dto/add-game-to-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playerRepository.create({
      name: createPlayerDto.name,
      games: [],
    });
    await this.playerRepository.save(newPlayer);
    return newPlayer;
  }

  async addGameToPlayer(AddGameToPlayerDto: AddGameToPlayerDto) {
    const player = await this.playerRepository.findOne(
      AddGameToPlayerDto.playerId,
    );
    const game = await this.gameRepository.findOne(AddGameToPlayerDto.gameId);

    if (!player.games.includes(game)) {
      player.games.push(game);
    }

    this.playerRepository.save(player);

    return player;
  }

  findAll() {
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoin('player.games', 'game')
      .getMany();
  }

  findOne(id: number) {
    return this.playerRepository.find({ id });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return this.playerRepository.delete(id);
  }
}
