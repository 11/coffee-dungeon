import Color from './color.js'
import OrthographicCamera from './orthographic-camera.js'
import { ValidationError } from '../errors.js'

export default class ShapeRenderer {
  private ctx: CanvasRenderingContext2D
  private camera: OrthographicCamera
  private fill: boolean

  public set StrokeStyle(value: string) {
    this.ctx.strokeStyle = value
  }

  public set FillStyle(value: string) {
    this.ctx.fillStyle = value
    this.fill = true
  }

  /**
   * @param {Number} value
   */
  public set LineWidth(value) {
    this.ctx.lineWidth = value
  }

  /**
   * @param {Number} - between - 0 and 1
   */
  public set Alpha(value) {
    this.ctx.globalAlpha = value
  }

  public constructor(ctx = window.game.RenderContext) {
    this.ctx = ctx
    this.fill = false
  }

  /**
   *
   * @param {OrthographicCamera} camera
   */
  public begin(camera: OrthographicCamera = null): void {
    this.camera = camera
    this.ctx.beginPath()
  }

  public drawLine(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): void {
    if (this.camera) {
      x1 += this.camera.Position.x
      y1 += this.camera.Position.y
      x2 += this.camera.Position.x
      y2 += this.camera.Position.y
    }

    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
  }

  public drawLines(...lines: number[]): void {
    // have to have at least 2 lines in list, 2 lines are made of of 4 numbers, therefore length >= 4
    const isMinSize = lines.length >= 4
    const isCorrectNumberOfEntries = lines.length % 2 === 0

    if (!isMinSize) {
      throw new ValidationError('drawLines - must have at least 2 sides in list (aka 4 numbers in list)')
    } else if (!isCorrectNumberOfEntries) {
      throw new ValidationError('drawLines - cannot have an odd number of entries in list, each line-endpoint is made of up 2 numbers')
    }

    for (let i = 0; i < lines.length - 2; i += 2) {
      const x1 = lines[i]
      const y1 = lines[i+1]
      const x2 = lines[i+2]
      const y2 = lines[i+3]
      this.drawLine(x1, y1, x2, y2)
    }
  }

  public drawPolygon(...lines: number[]): void {
    // draw all lines
    this.drawLines(...lines)

    // wrap line back to beginning
    const [x1, y1] = [lines[0], lines[1]]
    const [x2, y2] = [lines.at(-2), lines.at(-1)]
    this.drawLine(x1, y1, x2, y2)
  }

  public drawCircle(x: number = 0, y: number = 0, radius: number = 1): void {
    if (this.camera) {
      x += this.camera.Position.x
      y += this.camera.Position.y
    }

    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
  }

  public drawRectangle(x: number = 0, y: number = 0, width: number = 100, height: number = 100): void {
    if (this.camera) {
      x += this.camera.Position.x
      y += this.camera.Position.y
    }

    this.ctx.rect(x, y, width, height)
  }

  public end(): void {
    if (this.fill) {
      this.ctx.fill()
      this.fill = false
    }

    this.ctx.stroke()

    this.ctx.globalAlpha = 1
    this.camera = null
  }
}
