import DemoScreen from './game/scenes/demo.js'
import Game from './engine/game.js'

window.game = new Game()
game.addScene('demo', new DemoScreen())
game.setScene('demo')
game.start()
