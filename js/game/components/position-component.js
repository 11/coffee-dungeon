import { Vector2 } from '../../engine/threejs-math/index.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../tilemap/isometric-tilemap.js'

export default class PositionComponent {
  gridPosition = null
  tilemap = null

  /**
   *
   * @return {Vector2} gridPosition
   */
  get GridPosition() {
    return this.gridPosition
  }

  /**
   *
   * @param {value} Vector2
   */
  set GridPosition(value) {
    this.gridPosition = value
  }

  /**
   *
   * @return {Vector2} screenPosition
   */
  get ScreenPosition() {
    if (this.tilemap instanceof OrthographicTilemap) {
      return OrthographicTilemap.mapToGlobal(this.gridPosition)
    } else if (this.tilemap instanceof IsometricTilemap) {
      return IsometricTilemap.mapToGlobal(this.gridPosition)
    }
  }

  /**
   *
   * @param {OrthographicTilemap | IsometricTilemap}
   * @param {Vector2} startGridPosition
   */
  constructor(tilemap, startGridPosition) {
    this.tilemap = tilemap
    this.gridPosition = startGridPosition
  }

  /**
   * move an entity inside a grid
   * @param {Vector2} movementVector
   */
  move(movementVector) {
    this.gridPosition.add(movementVector)
  }
}
