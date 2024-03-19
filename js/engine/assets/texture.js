export default class Texture {
  image = null

  /**
   *
   * @param {string} imageId
   * @param {Number} dx
   * @param {Number} dy
   * @param {Number} dw
   * @param {Number} dh
   */
  constructor(imageId) {
    this.image = window.game.AssetManager.get(imageId)
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  draw(ctx, x, y, width, height) {
    ctx.drawImage(this.image, x, y, width, height)
  }
}