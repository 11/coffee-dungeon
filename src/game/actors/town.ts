import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import OrthographicTilemap from '../tilemap/orthographic-tilemap'

import type { GridActorAttributes } from './grid-actor'
import GridActor from './grid-actor.js'

export default class Town extends GridActor {
  public constructor(tilemap: OrthographicTilemap, attributes: GridActorAttributes) {
    attributes.imageId = 'decal-house'
    attributes.class = 'Town'
    attributes.health = 3
    attributes.maxHealth = 3

    super(tilemap, attributes)
  }

  public update(): void {
    super.update()
  }

  public draw(spriteRenderer: SpriteRenderer): void {
    super.draw(spriteRenderer)
  }
}
