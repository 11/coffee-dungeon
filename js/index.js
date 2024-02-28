import DemoScreen from './game/screens/demo.js'
import InputProcessor from './engine/input/input-processor.js'
import Game from './engine/game.js'

window.game = new Game()

game.addScreen('demo', new DemoScreen())
game.setScreen('demo')

game.start()
