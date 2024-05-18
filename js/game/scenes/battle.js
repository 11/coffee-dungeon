import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
// import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'
import OrthographicTilemap from '../../engine/tilemap/orthographic-tilemap.js'
import OrthographicTile from '../../engine/tilemap/orthographic-tile.js'
import Tile from '../../engine/tilemap/isometric-tile.js'

export default class Battle extends Scene {
  tilemap = null
  camera = null
  spriteRenderer = null

  constructor() {
    super()
  }

  initialize() {
    this.spriteRenderer = new SpriteRenderer()

    this.camera = new OrthographicCamera()
    // this.camera.translate(
    //   -OrthographicTile.SCREEN_SIZE_X * 6 + OrthographicTile.WORLD_SIZE,
    //   -OrthographicTile.SCREEN_SIZE_Y * 2
    // )


    // load game world
    // this.grid = new IsometricTileMap(new Vector2(8, 8), null, this.debug)
    this.tilemap = new OrthographicTilemap(new Vector2(8, 8), null, this.debug)

    // configure game inputs
    // window.game.InputManager = new Controller(this.camera)
    window.game.InputManager = new Controller(this.camera, this.tilemap)
  }

  update() {

  }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.tilemap.draw(this.spriteRenderer, this.camera)
  }
}
