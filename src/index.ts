import Game from './engine/game'
import Battle from './game/scenes/battle'

declare global {
  interface Window {
    game: Game  // Change 'string' to whatever type your field should be
  }
}

window.game = new Game()

window.game.addScene('battle', new Battle())
window.game.setScene('battle')

window.game.addImage('dirt-tileset', 'asset-dirt-tileset')
window.game.addImage('entity-skull', 'debug-asset-skull')
window.game.addImage('entity-wizard', 'debug-asset-wizard')
window.game.addImage('decal-grave', 'debug-asset-grave')
window.game.addImage('decal-house', 'debug-asset-house')
window.game.addImage('decal-church', 'debug-asset-church')

window.game.start()
