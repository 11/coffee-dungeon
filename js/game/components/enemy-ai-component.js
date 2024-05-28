import MovementRangeComponent from './movement-range-component.js'

export default class EnemyAIComponent {
  movementRangeComponent = null

  gridPosition = null
  tilemap = null

  constructor(gridPosition, tilemap) {
    this.movementRangeComponent = new MovementRangeComponent()

    this.gridPosition = gridPosition
    this.tilemap = tilemap
  }
}
