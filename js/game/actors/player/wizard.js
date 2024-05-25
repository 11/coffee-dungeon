import SpriteRenderer from '../../../engine/gfx/sprite-renderer.js'
import GridActor from '../grid-actor.js'

export default class Wizard extends GridActor {
  get isPlayer() {
    return true
  }

  get isEnemy() {
    return false
  }

  constructor(tilemap, attributes = {}) {
    attributes.imageId = 'entity-wizard'
    attributes.class = 'wizard'

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
