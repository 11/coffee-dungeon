import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
// import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'
import OrthographicTilemap from '../../engine/tilemap/orthographic-tilemap.js'
import Tile from '../../engine/tilemap/isometric-tile.js'

export default class Battle extends Scene {
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

    // configure game inputs
    window.game.InputManager = new Controller(this.camera)

    // load game world
    // this.grid = new IsometricTileMap(new Vector2(8, 8), null, this.debug)
    this.grid = new OrthographicTilemap(new Vector2(8, 8), null, this.debug)
  }

  update() {

  }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.grid.draw(this.spriteRenderer, this.camera)
  }
}
