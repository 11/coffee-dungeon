export default class TextureRegion {
  dx = 0
  dy = 0
  dw = 0
  dh = 0
  image = null

  /**
   *
   * @param {string} imageId
   * @param {Number} dx
   * @param {Number} dy
   * @param {Number} dw
   * @param {Number} dh
   */
  constructor(imageId, dx, dy, dw, dh) {
    this.image = window.game.AssetManager.get(imageId)
    this.dx = dx
    this.dy = dy
    this.dw = dw
    this.dh = dh
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number | null} dx
   * @param {Number | null} dy
   * @param {Number | null} dw
   * @param {Number | null} dh
   */
  draw(ctx, x, y, width, height, dx = null, dy = null, dw = null, dh = null) {
    const DX = dx ?? this.dx
    const DY = dy ?? this.dy
    const DW = dw ?? this.dw
    const DH = dh ?? this.dh

    ctx.drawImage(
      this.image,
      DX, DY,
      DW, DH,
      x, y,
      width, height
    )
  }
}
