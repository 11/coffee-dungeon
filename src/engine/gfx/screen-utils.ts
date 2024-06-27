import Color from './color'

export default class ScreenUtils {
  public static clear(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, fillColor: string = Color.DARK_GRAY) {
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.stroke()
  }
}
