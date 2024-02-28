import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'

import Grid from '../grid.js'

export default class DemoScreen extends Scene {
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
    window.game.InputManager = new Controller()

    this.spriteRenderer = new SpriteRenderer()
    this.camera = new OrthographicCamera()
    this.camera.translate(
      -window.game.Viewport.Width / 2,
      -window.game.Viewport.Height / 6
    )

    // load game world
    this.grid = new Grid(8, true)
  }

  update() { }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.grid.draw(this.spriteRenderer, this.camera)
  }
}
