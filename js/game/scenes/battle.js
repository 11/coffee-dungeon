import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
// import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'
// import IsometricTile from '../../engine/tilemap/isometric-tile.js'
import OrthographicTilemap from '../../engine/tilemap/orthographic-tilemap.js'
// import OrthographicTile from '../../engine/tilemap/orthographic-tile.js'
import GridActor from '../grid-actor.js'

export default class Battle extends Scene {
  tilemap = null
  camera = null
  spriteRenderer = null

  skulls = null
  town = null
  wizard = null

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
    this.tilemap = new OrthographicTilemap(new Vector2(8, 8), this.camera, this.debug)

    // configure game inputs
    // window.game.InputManager = new Controller(this.camera)
    window.game.InputManager = new Controller(this.camera, this.tilemap)

    this.skulls = [
      new GridActor('entity-skull', new Vector2(5, 1), this.tilemap),
      new GridActor('entity-skull', new Vector2(1, 5), this.tilemap),
      new GridActor('entity-skull', new Vector2(4, 1), this.tilemap),
    ]

    this.town = [
      new GridActor('decal-house', new Vector2(3, 2), this.tilemap),
      new GridActor('decal-church', new Vector2(0, 5), this.tilemap),
    ]

    this.grave = new GridActor('decal-grave', new Vector2(4, 7), this.tilemap)
    this.wizard = new GridActor('entity-wizard', new Vector2(5, 3), this.tilemap)
  }

  update() {

  }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.tilemap.draw(this.spriteRenderer, this.camera)
    this.skulls.forEach(s => s.draw(this.spriteRenderer))
    this.town.forEach(place => place.draw(this.spriteRenderer))
    this.grave.draw(this.spriteRenderer)
    this.wizard.draw(this.spriteRenderer)
  }
}
