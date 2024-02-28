export default class TextureRegion {
  x = 0
  y = 0
  dx = 0
  dy = 0
  dw = 0
  dh = 0
  width = 0
  height = 0
  image = null

  /**
   *
   * @param {string} imageId
   * @param {Number} dx
   * @param {Number} dy
   * @param {Number} dw
   * @param {Number} dh
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  constructor(imageId, dx, dy, dw, dh, x, y, width, height) {
    this.image = window.game.AssetManager.get(imageId)
    this.dx = dx
    this.dy = dy
    this.dw = dw
    this.dh = dh
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.dx, this.dy,
      this.dw, this.dh,
      this.x, this.y,
      this.width, this.height
    )
  }
}
