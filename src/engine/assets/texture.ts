export default class Texture {
  private image = null

  /**
   *
   * @param {string} imageId
   * @param {Number} dx
   * @param {Number} dy
   * @param {Number} dw
   * @param {Number} dh
   */
  constructor(imageId: string) {
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
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.drawImage(this.image, x, y, width, height)
  }
}
