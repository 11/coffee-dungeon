import Demo from './game/scenes/demo.js'
import Game from './engine/game.js'

window.game = new Game()
game.addScene('demo', new Demo())
game.setScene('demo')
game.start()
