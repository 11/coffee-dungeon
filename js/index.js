import Game from './engine/game.js'
import Battle from './game/scenes/battle.js'
import CardShop from './game/scenes/card-shop.js'

window.game = new Game()
game.addScene('battle', new Battle())
game.addScene('card-shop', new CardShop())
game.setScene('battle')

game.addImage('dirt-tileset', 'asset-dirt-tileset')
game.addImage('entity-skull', 'debug-asset-skull')

game.start()
