import Scene from '../../engine/scenes/scene.js'
import ScreenUtils from '../../engine/gfx/screen-utils.js'
import Controller from '../controls/controller.js'
import PlayerTurnController from '../controls/player-turn-controller.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
// import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'
// import IsometricTile from '../../engine/tilemap/isometric-tile.js'
// import OrthographicTile from '../../engine/tilemap/orthographic-tile.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import { level } from '../test-level.js'

export const BattleStates = {
  // ENVIRONMENTAL_MOVE: 0,
  PLAYER_MOVE: 1,
  ENEMY_MOVE: 2,
  WIN_CONDITION: 3,
}

export default class Battle extends Scene {
  tilemap = null
  camera = null
  spriteRenderer = null

  players = null
  enemies = null
  town = null

  battleState = null
  battleStateChangeFlag = true

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

    // this.towns = [
    //   new GridActor(this.tilemap, {
    //     class: 'GridActor',
    //     imageId: 'decal-house',
    //     gridPosition: new Vector2(3, 2),
    //     health: 2
    //   }),
    //   new GridActor(this.tilemap, {
    //     imageId: 'decal-house',
    //     gridPosition: new Vector2(0, 5),
    //     health: 2
    //   }),
    // ]

    // this.grave = new GridActor(this.tilemap, {
    //   imageId: 'decal-grave',
    //   gridPosition: new Vector2(4, 7)
    // })

    this.tilemap = new OrthographicTilemap(
      level,
      this.camera,
      window.game.Debug
    )

    // configure game inputs
    // window.game.InputManager = new Controller(this.camera)
    window.game.InputManager = new Controller(this.tilemap)

    this.battleState = BattleStates.PLAYER_MOVE
  }

  /**
   *
   * @param {Number} deltaTime - time between previous frame and now
   */
  update(deltaTime) {
    switch(this.battleState) {
    case BattleStates.PLAYER_MOVE: {
      if (this.battleStateChangeFlag) {
        window.game.InputManager = new PlayerTurnController(this.tilemap)
        this.battleStateChangeFlag = false


      }
      break
    }
    }
  }

  draw(ctx) {
    ScreenUtils.clear(ctx)
    this.tilemap.draw(this.spriteRenderer, this.camera)
  }
}
