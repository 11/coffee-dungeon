import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'

import Tile from '../tile.js'
import Grid from '../grid.js'
import Player from '../player.js'

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
      -Tile.SCREEN_SIZE_X * 6 + Tile.WORLD_SIZE,
      -Tile.SCREEN_SIZE_Y * 2
    )
    // load game assets
    window.game.addImage('dirt-tileset', 'asset-dirt-tileset')
    if (this.debug) {
      console.log(window.game.AssetManager.toString())
    }

    // configure game inputs
    window.game.InputManager = new Controller(this.camera)

    // load game world
    this.grid = new Grid(8, this.debug)


    
  }

  update() { 

  }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.grid.draw(this.spriteRenderer, this.camera)
  }
}
