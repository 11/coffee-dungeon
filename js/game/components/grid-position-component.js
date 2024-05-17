import { Vector2 } from '../../engine/threejs-math'

export default class GridPositionComponent {
  gridPosition = null

  /**
   *
   * @param {Vector2} gridPosition
   */
  constructor(gridPosiiton = new Vector2(0, 0)) {
    this.gridPosition = gridPosiiton
  }

  /**
   * move an entity inside a grid
   * @param {*} gridX
   * @param {*} gridY
   */
  move(gridX, gridY) {
    this.gridPosition.set(gridX, gridY)
  }
}
