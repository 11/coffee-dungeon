import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import { NotImplementedError } from '../../engine/errors'

import GridActor from './grid-actor'
import type { GridActorAttributes} from './grid-actor'
import type MovementRangeComponent from '../components/movement-range-component'

export default class Skull extends GridActor {
  private movementRangeComponent: MovementRangeComponent

  public get isPlayer() {
    return false
  }

  public get isEnemy() {
    return true
  }

  public constructor(tilemap, attributes: GridActorAttributes) {
    attributes.imageId = 'entity-skull'
    attributes.class = 'skull'

    super(tilemap, attributes)

    // this.movementRangeComponent = new MovementRangeComponent(attributes.range, this.positionComponent.GridPosition, this.tilemap)
    // this.enemyMovementComponent = new EnemyMovementComponent(attributes)
  }

  public attack(): void{
    throw new NotImplementedError('attack not implemented')
  }

  public update(): void {
    super.update()
  }

  public draw(spriteRenderer: SpriteRenderer): void {
    super.draw(spriteRenderer)
  }
}
