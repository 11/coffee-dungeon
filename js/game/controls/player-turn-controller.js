import InputManager from '../../engine/io/input-manager.js'
import GridActor from '../actors/grid-actor.js'
import OrthographicTilemap from '../../engine/tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'
import { Vector2 } from '../../engine/threejs-math/index.js'

export default class PlayerTurnController extends InputManager {
  players = null
  tilemap = null

  /**
   *
   * @param {GridActor[]} players
   * @param {OrthographicTilemap | IsometricTilemap} tilemap
   */
  constructor(players, tilemap) {
    super()

    this.players = players
    this.tilemap = tilemap
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mouseUp(keycode, mouseCoordinates) {
    console.log('Mouse Up', keycode, mouseCoordinates)
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mouseDown(keycode, mouseCoordinates) {
    console.log('Mouse Down', keycode, mouseCoordinates)
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mousePressed(keycode, mouseCoordinates) {
    const tilePosition = OrthographicTilemap.mapToLocal(mouseCoordinates)
    for (const character of this.players) {
      if (tilePosition.equals(character.GridPosition)) {
        character.Selected = !character.Selected
      }
    }
  }

  /**
   *
   * @param {Vector2} mouseCoordinates
   */
  mouseMoved(mouseCoordinates) {
    console.log('Mouse Moved', mouseCoordinates)
  }

  /**
   *
   * @param {Number} keycode
   */
  keyUp(keycode) {
    console.log('Key Up', keycode)
  }

  /**
   *
   * @param {Number} keycode
   */
  keyDown(keycode) {
    console.log('Key Down', keycode)
  }

  /**
   *
   * @param {Number} keycode
   */
  keyPressed(keycode) {
    console.log('Key Pressed', keycode)
  }
}
