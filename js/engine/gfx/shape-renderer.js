import Color from './color.js'
import OrthographicCamera from './orthographic-camera.js'
import { ValidationError } from '../errors.js'

export default class ShapeRenderer {
  ctx = null
  camera = null
  fill = false

  constructor(ctx = window.game.RenderContext) {
    this.ctx = ctx
  }

  /**
   *
   * @param {OrthographicCamera} camera
   */
  begin(camera = null) {
    this.camera = camera

    this.ctx.beginPath()
  }

  /**
   *
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   */
  drawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    if (this.camera) {
      x1 += this.camera.Position.x
      y1 += this.camera.Position.y
      x2 += this.camera.Position.x
      y2 += this.camera.Position.y
    }

    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
  }

  /**
   *
   * @param {Array<Number>} lines
   */
  drawLines(...lines) {
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

  /**
   *
   * @param {Array<Number>} lines
   */
  drawPolygon(...lines) {
    // draw all lines
    this.drawLines(...lines)

    // wrap line back to beginning
    const [x1, y1] = [lines[0], lines[1]]
    const [x2, y2] = [lines.at(-2), lines.at(-1)]
    this.drawLine(x1, y1, x2, y2)
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   */
  drawCircle(x = 0, y = 0, radius = 1) {
    if (this.camera) {
      x += this.camera.Position.x
      y += this.camera.Position.y
    }

    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   */
  drawRectangle(x = 0, y = 0, width = 100, height = 100) {
    if (this.camera) {
      x += this.camera.Position.x
      y += this.camera.Position.y
    }

    this.ctx.rect(x, y, width, height)
  }

  end() {
    if (this.fill) {
      this.ctx.fill()
      this.fill = false
    }

    this.ctx.stroke()

    this.ctx.globalAlpha = 1
    this.camera = null
  }

  /**
   * @param {Color} value
   */
  set StrokeStyle(value) {
    this.ctx.strokeStyle = value
  }

  /**
   * @param {Color} value
   */
  set FillStyle(value) {
    this.ctx.fillStyle = value
    this.fill = true
  }

  /**
   * @param {Number} value
   */
  set LineWidth(value) {
    this.ctx.lineWidth = value
  }

  /**
   * @param {Number} - between - 0 and 1
   */
  set Alpha(value) {
    this.ctx.globalAlpha = value
  }
}