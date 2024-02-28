import Color from './color.js'

export default class ScreenUtils {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  static clear(ctx, fillColor = Color.DARK_GRAY) {
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.fillRect(0, 0, ScreenUtils.WIDTH, ScreenUtils.HEIGHT)
    ctx.stroke()
  }
}
