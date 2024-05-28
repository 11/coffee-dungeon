import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'

import GridActor from './grid-actor.js'

export default class Town extends GridActor {
  /**
   *
   * @param {OrthographicTilemap} tilemap
   * @param {Object} attributes
   */
  constructor(tilemap, attributes = {}) {
    attributes.imageId = 'decal-house'
    attributes.class = 'Town'
    attributes.startingHealth = 3
    attributes.maxHealth = 3

    super(tilemap, attributes)
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
