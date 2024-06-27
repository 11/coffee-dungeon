import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import { NotImplementedError } from '../../engine/errors'

import GridActor from './grid-actor'
import type { GridActorAttributes } from './grid-actor'
import MovementRangeComponent from '../components/movement-range-component'
import { Vector2 } from '../../engine/math/Vector2'

export default class Wizard extends GridActor {
  private movementRangeComponent: MovementRangeComponent

  public get Held(): boolean {
    return this.held
  }

  public set Held(value: boolean) {
    this.held = value
  }

  public get IsPlayer(): boolean {
    return true
  }

  public get IsEnemy(): boolean {
    return false
  }

  public constructor(tilemap, attributes: GridActorAttributes) {
    attributes.imageId = 'entity-wizard'
    attributes.class = 'wizard'
    super(tilemap, attributes)

    this.movementRangeComponent = new MovementRangeComponent(attributes.range, this.positionComponent.GridPosition, this.tilemap)

    this.held = false
  }

  public move(gridPosition: Vector2): void {
    if (this.movementRangeComponent.isPositionInRange(gridPosition)) {
      this.positionComponent.GridPosition = gridPosition
    }
  }

  public attack(): void {
    throw new NotImplementedError('wizard cannot attack')
  }

  public update(): void {
    super.update()
  }

  public draw(spriteRenderer: SpriteRenderer): void {
    if (this.selected) {
      this.movementRangeComponent.draw()
    }

    super.draw(spriteRenderer)
  }
}
