import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
import GridActor from './grid-actor.js'
import MovementRangeComponent from '../components/movement-range-component.js'

export default class Wizard extends GridActor {
  movementRangeComponent = null

  held = false

  get Held() {
    return this.held
  }

  set Held(value) {
    this.held = value
  }

  get IsPlayer() {
    return true
  }

  get IsEnemy() {
    return false
  }

  constructor(tilemap, attributes = {}) {
    attributes.imageId = 'entity-wizard'
    attributes.class = 'wizard'
    super(tilemap, attributes)

    this.movementRangeComponent = new MovementRangeComponent(attributes.range, this.positionComponent.GridPosition, this.tilemap)

    this.held = false
  }

  /**
   *
   * @param {Vector2} gridPosition
   */
  move(gridPosition) {
    if (this.movementRangeComponent.isPositionInRange(gridPosition)) {
      this.positionComponent.GridPosition = gridPosition
    }
  }

  attack() {

  }

  update() {
    super.update()
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  draw(spriteRenderer) {
    if (this.selected) {
      this.movementRangeComponent.draw()
    }

    super.draw(spriteRenderer)
  }
}
