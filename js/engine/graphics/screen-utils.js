import Color from './color.js'

export default class ScreenUtils {
  static canvas = document.querySelector('canvas')
  static WIDTH = ScreenUtils.canvas.clientWidth
  static HEIGHT = ScreenUtils.canvas.clientHeight

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
