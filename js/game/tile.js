import { Vector2 } from '../engine/threejs-math/index.js'
import Colors from '../engine/graphics/colors.js'
import TextureRegion from '../engine/graphics/texture-region.js'

export default class Tile {
  static SIZE = 64

  pos = null
  color = null
  image = null
  debug = true

  iHat = new Vector2(1, 0.5).multiplyScalar(Tile.SIZE)
  jHat = new Vector2(-1, 0.5).multiplyScalar(Tile.SIZE)

  set Color(value) {
    this.color = value
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {imageId} string
   * @param {String} color
   * @param {Boolean} debug
   */
  constructor(x, y, imageId = null, debug = true, color = Colors.RED) {
    this.pos = new Vector2(x, y)
    this.#toIsometric()

    this.image = new TextureRegion(
      imageId,
      102, 0, // spritesheet dx and dy
      102, 101, // spritesheet dw and dh
      this.pos.x - Tile.SIZE, // subtract 1 tile's size to render image based on the center of a tile
      this.pos.y - Tile.SIZE / 2, // same logic applies for a tile's height, but need to half the height to force the isometric perspective
      Tile.SIZE * 2, Tile.SIZE * 2 // double the size of the image to file the grid cell
    )

    this.debug = debug
    this.color = color
  }

  #toIsometric() {
    const i = this.iHat.clone()
    i.multiplyScalar(this.pos.x)

    const j = this.jHat.clone()
    j.multiplyScalar(this.pos.y)

    this.pos.x = i.x + j.x
    this.pos.y = i.y + j.y
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  #drawDebugLines(ctx) {
    const topCorner = new Vector2(this.pos.x, this.pos.y - Tile.SIZE / 2)
    const rightCorner = new Vector2(this.pos.x + Tile.SIZE, this.pos.y)
    const bottomCorner = new Vector2(this.pos.x, this.pos.y + Tile.SIZE / 2)
    const leftCorner = new Vector2(this.pos.x - Tile.SIZE, this.pos.y)
    const center = this.pos

    ctx.strokeStyle = this.color
    ctx.fillStyle = this.color
    ctx.lineWidth = 3
    ctx.beginPath()

    ctx.moveTo(topCorner.x, topCorner.y)
    ctx.lineTo(leftCorner.x, leftCorner.y)

    ctx.moveTo(topCorner.x, topCorner.y)
    ctx.lineTo(rightCorner.x, rightCorner.y)

    ctx.moveTo(bottomCorner.x, bottomCorner.y)
    ctx.lineTo(leftCorner.x, leftCorner.y)

    ctx.moveTo(bottomCorner.x, bottomCorner.y)
    ctx.lineTo(rightCorner.x, rightCorner.y)

    ctx.stroke()
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  #drawImage(ctx) {
    if (!this.image) {
      return
    }

    if (this.debug) {
      ctx.globalAlpha = 0.5
      this.image.draw(ctx)
      ctx.globalAlpha = 1
    } else {
      this.image.draw(ctx)
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.#drawImage(ctx)

    if (this.debug) {
      this.#drawDebugLines(ctx)
    }
  }
}
