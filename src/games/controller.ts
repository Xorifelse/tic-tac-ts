import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError,  Patch, BadRequestError } from 'routing-controllers'
import Game, {Colors} from './entity'

const randomProperty = (obj) => {
  let keys = Object.keys(obj)
  return obj[keys[keys.length * Math.random() << 0]]
}

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

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

  @Patch('/games/:id')
  @Put('/games/:id')
  @HttpCode(204)
  async updateGame(
    @Param('id') id : number,
    @Body() update: Partial<Game>
  ) {
    // basic error checking before querying
    if(update.color && !Colors[update.color]){
      throw new BadRequestError('Colors may only be: ' + Object.values(Colors).join(', '))
    }

    if(update.board){
      const board = JSON.parse(update.board)

      if(board.length !== 3 || board.filter(row => row.length === 3).length !== 3){
        throw new BadRequestError('Invalid board grid; Expected 3x3')
      }
    }

    // All seems fine, query
    const game = await Game.findOne(id)
    if(!game) throw new NotFoundError('Cannot find game')

    if(update.board){
      const cnt = moves(JSON.parse(game.board), JSON.parse(update.board))

      if(cnt === 0){
        throw new BadRequestError('You didnt make any move!')
      } else if(cnt > 1){
        throw new BadRequestError('Only one move is allowed!')
      }
    }

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