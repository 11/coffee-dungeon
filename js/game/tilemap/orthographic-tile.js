import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'
import Color from '../../engine/gfx/color.js'

import GridActor from '../../game/actors/grid-actor.js'

export default class OrthographicTile {
  static TILE_SIZE = 96

  shapeRenderer = null
  debug = null

  actor = null
  imageId = null
  gridCoordinate = null

  get ImageId() {
    return this.imageId
  }

  get GridCoordinate() {
    return this.gridCoordinate
  }

  get Populated() {
    return this.actor !== null
  }

  /**
   *
   * @returns {GridActor}
   */
  get Actor() {
    return this.actor
  }

  /**
   *
   * @param {GridActor}
   */
  set Actor(gridActor) {
    this.actor = gridActor
  }

  /**
   *
   * @param {String} imageId
   * @param {Vector2} gridCoordinate
   * @param {Boolean} debug
   */
  constructor(imageId, gridCoordinate, debug = true) {
    this.imageId = imageId
    this.gridCoordinate = gridCoordinate
    this.populated = false

    this.debug = debug
    this.shapeRenderer = new ShapeRenderer()
  }

  #drawDebugTile() {
    const x = this.gridCoordinate.x * OrthographicTile.TILE_SIZE
    const y = this.gridCoordinate.y * OrthographicTile.TILE_SIZE

    let color = Color.GREEN
    if ((this.gridCoordinate.x + this.gridCoordinate.y) % 2 === 0) {
      color = Color.WHITE
    }

    if (this.actor?.Selected && this.actor?.isPlayer) {
      color = Color.YELLOW
    }

    this.shapeRenderer.begin()
    this.shapeRenderer.FillStyle = color
    this.shapeRenderer.drawRectangle(x, y, OrthographicTile.TILE_SIZE, OrthographicTile.TILE_SIZE)
    this.shapeRenderer.end()
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  draw(spriteRenderer) {
    if (debug) {
      this.#drawDebugTile()
    }
  }
}
