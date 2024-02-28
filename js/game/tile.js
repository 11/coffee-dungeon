import { Vector2 } from '../engine/threejs-math/index.js'
import Color from '../engine/gfx/color.js'
import TextureRegion from '../engine/assets/texture-region.js'
import SpriteRenderer from '../engine/gfx/sprite-renderer.js'
import ShapeRenderer from '../engine/gfx/shape-renderer.js'

export default class Tile {
  static SIZE = 64

  textureRegion = null

  debug = true
  shapeRenderer = new ShapeRenderer()

  position = null // position is the origin of the tile
  iHat = new Vector2(1, 0.5).multiplyScalar(Tile.SIZE)
  jHat = new Vector2(-1, 0.5).multiplyScalar(Tile.SIZE)

  /**
   *
   * @param {imageId} string
   * @param {Number} x
   * @param {Number} y
   * @param {String} color
   * @param {Boolean} debug
   */
  constructor(imageId, x, y, debug = true) {
    this.position = new Vector2(x, y)
    this.#toIsometric()

    this.textureRegion = new TextureRegion(
      imageId,
      102, 0, // spritesheet dx and dy
      102, 101, // spritesheet dw and dh
    )

    this.debug = debug
  }

  #toIsometric() {
    const i = this.iHat.clone()
    i.multiplyScalar(this.position.x)

    const j = this.jHat.clone()
    j.multiplyScalar(this.position.y)

    this.position.x = i.x + j.x
    this.position.y = i.y + j.y
  }

  /**
   * 
   * @param {Camera} camera 
   */
  #drawDebugLines(camera) {
    const topCorner = new Vector2(this.position.x, this.position.y - Tile.SIZE / 2)
    const rightCorner = new Vector2(this.position.x + Tile.SIZE, this.position.y)
    const bottomCorner = new Vector2(this.position.x, this.position.y + Tile.SIZE / 2)
    const leftCorner = new Vector2(this.position.x - Tile.SIZE, this.position.y)

    this.shapeRenderer.StrokeStyle = Color.RED
    this.shapeRenderer.LineWidth = 4
    this.shapeRenderer.begin(camera)
    this.shapeRenderer.drawPolygon(
      topCorner.x, topCorner.y, 
      rightCorner.x, rightCorner.y,
      bottomCorner.x, bottomCorner.y,
      leftCorner.x, leftCorner.y,
    )
    this.shapeRenderer.end()
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  #drawImage(spriteRenderer, camera) {
    const trX = this.position.x - Tile.SIZE // subtract 1 tile's size to render image based on the center of a tile
    const trY = this.position.y - Tile.SIZE / 2 // same logic applies for a tile's height, but need to half the height to force the isometric perspective
    const trW = Tile.SIZE * 2 // double the size of the image to fill the grid cell
    const trH = Tile.SIZE * 2 // double the size of the image to file the grid cell

    const alpha = this.debug 
      ? 0.3
      : 1

    spriteRenderer.begin(camera)
    spriteRenderer.drawTextureRegion(this.textureRegion, trX, trY, trW, trH, alpha)
    spriteRenderer.end()
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer 
   * @param {Camera} camera
   */
  draw(spriteRenderer, camera) {
    this.#drawImage(spriteRenderer, camera)

    if (this.debug) {
      this.#drawDebugLines(camera)
    }
  }
}
