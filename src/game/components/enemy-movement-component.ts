import { Vector2 } from '../../engine/math/Vector2'
import OrthographicTilemap from '../tilemap/orthographic-tilemap'
import MovementRangeComponent from './movement-range-component'

export default class EnemyAIComponent {
  private movementRangeComponent: MovementRangeComponent

  private gridPosition: Vector2
  private tilemap: OrthographicTilemap

  constructor(movementRangeComponent: MovementRangeComponent, tilemap: OrthographicTilemap) {
    this.movementRangeComponent = movementRangeComponent
    this.tilemap = tilemap

    // this.gridPosition =
  }

  private calculateMove(): void {
    const sortedEnemyObjectives = this.tilemap.Objectives.sort((objective1, objective2) => {
      const o1Distance = this.gridPosition.distanceTo(objective1.GridPosition)
      const o2Distance = this.gridPosition.distanceTo(objective2.GridPosition)
      if (o1Distance > o2Distance) {
        return 1
      } else if (o1Distance > o2Distance) {
        return -1
      }

      return 0
    })

    // TODO: pluck out random objectives from front of list and move enemy towards that objective
  }
}
