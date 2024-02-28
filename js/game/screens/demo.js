import Screen from '../../engine/screens/screen.js'
import ScreenUtils from '../../engine/graphics/screen-utils.js'
import Controller from '../controller.js'
import Camera from '../../engine/graphics/camera.js'
import SpriteRenderer from '../../engine/graphics/sprite-renderer.js'

import Grid from '../grid.js'

export default class DemoScreen extends Screen {
  grid = null
  camera = null
  spriteRenderer = null

  constructor() {
    super()
  }

  initialize() {
    // load game assets
    window.game.addImage('dirt-tileset', 'asset-dirt-tileset')
    console.log(window.game.AssetManager.toString())

    // configure game inputs
    window.game.InputProcessor = new Controller()

    this.spriteRenderer = new SpriteRenderer()
    this.camera = new Camera()
    this.camera.translate(-1280 / 2, -720 / 2)

    // load game world
    this.grid = new Grid(4, true)
  }

  update() { }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.grid.draw(this.spriteRenderer, this.camera)
  }
}
