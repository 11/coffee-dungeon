import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
import Tile from '../tile.js'

import Grid from '../grid.js'

export default class Demo extends Scene {
  grid = null
  camera = null
  spriteRenderer = null

  constructor() {
    super()
  }

  initialize() {
    this.spriteRenderer = new SpriteRenderer()
    
    this.camera = new OrthographicCamera()
    this.camera.translate(
      -(Tile.SIZE * 2) * 5,
      -Tile.SIZE * 2,
    )

    // load game assets
    window.game.addImage('dirt-tileset', 'asset-dirt-tileset')
    console.log(window.game.AssetManager.toString())

    // configure game inputs
    window.game.InputManager = new Controller(this.camera)

    // load game world
    this.grid = new Grid(8, true)
  }

  update() { }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.grid.draw(this.spriteRenderer, this.camera)
  }
}
