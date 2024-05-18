import ShapeRenderer from '../gfx/shape-renderer.js'
import SpriteRenderer from '../gfx/sprite-renderer.js'
import Color from '../gfx/color.js'

export default class OrthographicTile {
  static TILE_SIZE = 96

  imageId = null
  gridCoordinate = null

  shapeRenderer = null
  debug = null

  get ImageId() {
    return this.imageId
  }

  get GridCoordinate() {
    return this.gridCoordinate
  }

  constructor(imageId, gridCoordinate, debug = true) {
    this.imageId = imageId
    this.gridCoordinate = gridCoordinate

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
