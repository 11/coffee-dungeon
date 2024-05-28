import InputManager from '../../engine/io/input-manager.js'
import GridActor from '../actors/grid-actor.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../tilemap/isometric-tilemap.js'
import { Vector2 } from '../../engine/threejs-math/index.js'

export default class PlayerTurnController extends InputManager {
  tilemap = null
  selectedPlayer = null

  /**
   *
   * @param {GridActor[]} players
   * @param {OrthographicTilemap | IsometricTilemap} tilemap
   */
  constructor(tilemap) {
    super()

    this.tilemap = tilemap
  }

  #mousePressedPlayer(mouseCoordinates) {
    const tilePosition = OrthographicTilemap.mapToLocal(mouseCoordinates)

    const players = this.tilemap.Players
    for (const character of players) {
      if (tilePosition.equals(character.GridPosition)) {
        character.Selected = !character.Selected
        this.selectedPlayer = character
      } else {
        character.Selected = false
        this.selectedPlayer = null
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
    if (!!this.selectedPlayer) {
      this.selectedPlayer.Held = false
    }
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mouseDown(keycode, mouseCoordinates) {
    const selectedTile = OrthographicTilemap.mapToLocal(mouseCoordinates)
    if (!!this.selectedPlayer && selectedTile.equals(this.selectedPlayer.GridPosition)) {
      this.selectedPlayer.Held = true
    }
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mousePressed(keycode, mouseCoordinates) {
    this.#mousePressedPlayer(mouseCoordinates)
    this.#mousePressedEnemy(mouseCoordinates)
  }

  /**
   *
   * @param {Vector2} mouseCoordinates
   */
  mouseMoved(mouseCoordinates) {
    const selectedTile = OrthographicTilemap.mapToLocal(mouseCoordinates)
    if (!!this.selectedPlayer && this.selectedPlayer.Held) {
      this.selectedPlayer.move(selectedTile)
    }
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
