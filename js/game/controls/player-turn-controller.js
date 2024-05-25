import InputManager from '../../engine/io/input-manager.js'
import GridActor from '../actors/grid-actor.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../tilemap/isometric-tilemap.js'
import { Vector2 } from '../../engine/threejs-math/index.js'

export default class PlayerTurnController extends InputManager {
  tilemap = null

  /**
   *
   * @param {GridActor[]} players
   * @param {OrthographicTilemap | IsometricTilemap} tilemap
   */
  constructor(tilemap) {
    super()

    this.tilemap = tilemap
  }


  #mousePressedPlayerPiece(mouseCoordinates) {
    const tilePosition = OrthographicTilemap.mapToLocal(mouseCoordinates)

    const players = this.tilemap.Players
    for (const character of players) {
      if (tilePosition.equals(character.GridPosition)) {
        character.Selected = !character.Selected
      } else {
        character.Selected = false
      }
    }
  }

  #mousePressedEnemy(mouseCoordinates) {
    const tilePosition = OrthographicTilemap.mapToLocal(mouseCoordinates)
    const enemies = this.tilemap.Enemies
    for (const enemey of enemies) {
      if (tilePosition.equals(enemey.GridPosition)) {
        enemey.Selected = !enemey.Selected
      } else {
        enemey.Selected = false
      }
    }
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
    this.#mousePressedPlayerPiece(mouseCoordinates)
    this.#mousePressedEnemy(mouseCoordinates)
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
