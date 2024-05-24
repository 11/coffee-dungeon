import SpriteRenderer from '../../../engine/gfx/sprite-renderer.js'
import GridActor from '../grid-actor.js'

export default class Wizard extends GridActor {
  constructor(startPosition, tilemap, health = 3, energy = 3) {
    super('entity-wizard', startPosition, tilemap, health, energy)
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
    super.draw(spriteRenderer)
  }
}
