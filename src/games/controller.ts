import { JsonController, Get, Param, Post } from 'routing-controllers'
import Game, {Colors} from './entity'

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

  @Post('/games')
  createGame(
    @Param('name') name: string
  ) {
    return Colors
  }
}