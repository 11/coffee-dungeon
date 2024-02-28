import OrthographicCamera from './orthographic-camera.js'
import TextureRegion from '../assets/texture-region.js'
import { NotImplementedError } from '../errors.js'

export default class SpriteRenderer {
  ctx = null
  camera = null

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  constructor(ctx = window.game.RenderContext) {
    this.ctx = ctx
  }

  /**
   * 
   * @param {OrthographicCamera} camera 
   */
  begin(camera = null) {
    this.camera = camera
  }

  /**
   * 
   * @param {*} texture 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} width 
   * @param {Number} height 
   * @param {Number} alpha - between 0 and 1
   */
  drawTexture(texture, x = 0, y = 0, width = 0, height = 0, alpha = 1) {
    // TODO: create a texture class
    throw new NotImplementedError('drawTexture - TODO: need to implement Texture class')
  }

  /**
   * 
   * @param {TextureRegion} textureRegion 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} width 
   * @param {Number} height 
   * @param {Number} alpha - between 0 and 1
   */
  drawTextureRegion(textureRegion, x, y, width, height, alpha = 1, dx = null, dy = null, dw = null, dh = null) {
    if (alpha !== 1) {
      this.ctx.globalAlpha = alpha
    }

    if (this.camera) {
      x += this.camera.Position.x
      y += this.camera.position.y
    }

    textureRegion.draw(this.ctx, x, y, width, height, dx, dy, dw, dh)

    this.ctx.globalAlpha = 1
  }

  /**
   * 
   * @param {String} imageId 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} width 
   * @param {Number} height 
   * @param {Number} alpha - between 0 and 1
   */
  drawImage(imageId, x, y, width, height, alpha = 1) {
    const image = window.game.AssetManager.get(imageId)

    if (alpha !== 1) {
      this.ctx.globalAlpha = alpha
    }

    if (this.camera) {
      x += this.camera.Position.x
      y += this.camera.position.y
    }

    this.ctx.drawImage(image, x, y, width, height)

    this.ctx.globalAlpha = 1
  }

  end() {
    this.camera = null
    this.ctx.globalAlpha = 1
  }
}