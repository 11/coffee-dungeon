import OrthographicCamera from '../../engine/gfx/orthographic-camera'
import ScreenUtils from '../../engine/gfx/screen-utils'
import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import Scene from '../../engine/scenes/scene'
import Controller from '../controls/controller'
import PlayerTurnController from '../controls/player-turn-controller'
import { level } from '../test-level'
import OrthographicTilemap from '../tilemap/orthographic-tilemap'

export enum BattleStates {
  // ENVIRONMENTAL_MOVE: 0,
  PLAYER_MOVE,
  ENEMY_MOVE,
  WIN_CONDITION,
}

export default class Battle implements Scene {
  private tilemap: OrthographicTilemap
  private camera: OrthographicCamera
  private spriteRenderer: SpriteRenderer

  private battleState: BattleStates
  private battleStateChangeFlag: boolean

  public initialize(): void {
    this.spriteRenderer = new SpriteRenderer()
    this.camera = new OrthographicCamera()
    // this.camera.translate(
    //   -OrthographicTile.SCREEN_SIZE_X * 6 + OrthographicTile.WORLD_SIZE,
    //   -OrthographicTile.SCREEN_SIZE_Y * 2
    // )

    this.tilemap = new OrthographicTilemap(level, this.camera)
    this.battleState = BattleStates.PLAYER_MOVE
    window.game.InputManager = new Controller(this.tilemap, this.camera, false)
  }

  public update(deltaTime: number): void {
    switch (this.battleState) {
      case BattleStates.PLAYER_MOVE: {
        if (this.battleStateChangeFlag) {
          window.game.InputManager = new PlayerTurnController(this.tilemap)
          this.battleStateChangeFlag = false
        }

        break
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ScreenUtils.clear(ctx, window.game.Canvas)
    this.tilemap.draw(this.spriteRenderer, this.camera)
  }
}
