import { Vector2 } from '../../engine/math/Vector2.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../tilemap/isometric-tilemap.js'
import { InternalError } from '../../engine/errors.js'

export default class PositionComponent {
  private gridPosition: Vector2
  private tilemap: OrthographicTilemap

  public get GridPosition(): Vector2 {
    return this.gridPosition
  }

  public set GridPosition(value: Vector2) {
    this.gridPosition = value
  }

  public get ScreenPosition(): Vector2 {
    if (this.tilemap instanceof OrthographicTilemap) {
      return OrthographicTilemap.mapToGlobal(this.gridPosition)
    }
    // else if (this.tilemap instanceof IsometricTilemap) {
    //   return IsometricTilemap.mapToGlobal(this.gridPosition)
    // }

    throw new InternalError('Invalid Tilemap type')
  }

  public constructor(tilemap: OrthographicTilemap, startGridPosition: Vector2) {
    this.tilemap = tilemap
    this.gridPosition = startGridPosition
  }

  public move(movementVector: Vector2): void  {
    this.gridPosition.add(movementVector)
  }
}
