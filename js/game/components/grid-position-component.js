import { Vector2 } from '../../engine/threejs-math/index.js'
import OrthographicTilemap from '../../engine/tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'

export default class GridPositionComponent {
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
   * @param {Vector2} initialPosition
   * @param {OrthographicTilemap | IsometricTilemap}
   */
  constructor(initialPosition, tilemap) {
    this.gridPosition = initialPosition
    this.tilemap = tilemap
  }

  /**
   * move an entity inside a grid
   * @param {Vector2} movementVector
   */
  move(movementVector) {
    this.gridPosition.add(movementVector)
  }
}
