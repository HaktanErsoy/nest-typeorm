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
    });
    await this.playerRepository.save(newPlayer);
    return newPlayer;
  }

  async addGameToPlayer(AddGameToPlayerDto: AddGameToPlayerDto) {
    const player = await this.playerRepository.findOne(
      AddGameToPlayerDto.playerId,
    );
    const game = await this.gameRepository.findOne(AddGameToPlayerDto.gameId);

    await this.playerRepository
      .createQueryBuilder()
      .relation(Player, 'games')
      .of(player.id)
      .add(game);

    return this.findOne(player.id);
  }

  findAll() {
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.games', 'game')
      .getMany();
  }

  findOne(id: number) {
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.games', 'game')
      .where('player.id = :id', { id })
      .getOne();
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return this.playerRepository.delete(id);
  }
}
