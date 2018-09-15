import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError, BadRequestError, NotAcceptableError } from 'routing-controllers'
import Game, {Colors} from './entity'
import { ValidationError } from 'class-validator';

const randomProperty = (obj) => {
  let keys = Object.keys(obj)
  return obj[keys[ keys.length * Math.random() << 0]]
}

@JsonController()
export default class PageController {

  @Get('/games')
  getGames() {
    return Game.find()
  }

  @Get('/games/:id')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOne(id)
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id : number,
    @Body() update: Partial<Game>
  ) {
    if(update.color && !Colors[update.color]){
      throw new NotAcceptableError('Colors may only be: ' + Object.values(Colors).join(', ')).message
    }

    if(update.board){
      const board = JSON.parse(update.board)

      if(board.length !== 3 || board.filter(row => row.length !== 3).length !== 3){
        throw new NotAcceptableError('Invalid board grid; Expected 3x3').message
      }
    }

    const game = await Game.findOne(id)
    if(!game) throw new NotFoundError('Cannot find game')

    return Game.merge(game, {
      name: update.name ? update.name : game.name,
      color: update.color ? update.color : game.color,
      board: update.board ? update.board : game.board
    }).save()
  }

  @Post('/games/')
  @HttpCode(201)
  createGame(
    @Body() {name}: Game
  ) {
    return Game.insert({
      name,
      color: randomProperty(Colors),
      board: JSON.stringify([
        ['o', 'o', 'o'],
        ['o', 'o', 'o'],
        ['o', 'o', 'o']
      ])
    }).then(resp => {
      return resp.raw[0]
    })
  }
}