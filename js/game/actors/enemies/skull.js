import SpriteRenderer from '../../../engine/gfx/sprite-renderer.js'
import GridActor from '../grid-actor.js'

export default class Skull extends GridActor {
  get isPlayer() {
    return false
  }

  get isEnemy() {
    return true
  }

  constructor(tilemap, attributes = {}) {
    attributes.imageId = 'entity-skull'
    attributes.class = 'Skull'
    super(tilemap, attributes)
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
