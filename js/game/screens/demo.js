import Screen from '../../engine/screens/screen.js'
import ScreenUtils from '../../engine/graphics/screen-utils.js'
import InputProcessor from '../../engine/input/input-processor.js'

import Grid from '../grid.js'

export default class DemoScreen extends Screen {
  grid = null

  constructor() {
    super()
  }

  initialize() {
    // load game assets
    window.game.addImage('dirt-tileset', 'asset-dirt-tileset')
    console.log(window.game.AssetManager.toString())

    // configure game inputs
    window.game.InputProcessor = new InputProcessor()

    // load game world
    this.grid = new Grid(8, true)
  }

  update() { 

  }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.grid.draw(ctx)
  }
}
