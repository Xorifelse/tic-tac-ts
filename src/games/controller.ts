import { JsonController, Get, Param, Post, HttpCode, Body } from 'routing-controllers'
import Game, {Colors} from './entity'

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
    })
  }
}