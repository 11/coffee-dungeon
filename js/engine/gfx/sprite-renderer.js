import { Vector2 } from '../threejs-math/index.js'
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
   * @param {String} texture
   * @param {Vector2 poistion}
   * @param {Number} width
   * @param {Number} height
   * @param {Number} alpha - between 0 and 1
   */
  drawTexture(texture, position, width = 0, height = 0, alpha = 1) {
    // TODO: create a texture class
    throw new NotImplementedError('drawTexture - TODO: need to implement Texture class')
  }

  /**
   *
   * @param {TextureRegion} textureRegion
   * @param {Vector2} position
   * @param {Number} width
   * @param {Number} height
   * @param {Number} alpha - between 0 and 1
   */
  drawTextureRegion(textureRegion, position, width, height, alpha = 1, dx = null, dy = null, dw = null, dh = null) {
    if (alpha !== 1) {
      this.ctx.globalAlpha = alpha
    }

    if (this.camera) {
      position.add(this.camera.position)
    }

    textureRegion.draw(this.ctx, position, width, height, dx, dy, dw, dh)

    this.ctx.globalAlpha = 1
  }

  /**
   *
   * @param {String} imageId
   * @param {Vector2} position
   * @param {Number} width
   * @param {Number} height
   * @param {Number} alpha - between 0 and 1
   */
  drawImage(imageId, position, width, height, alpha = 1) {
    const image = window.game.AssetManager.get(imageId)

    if (alpha !== 1) {
      this.ctx.globalAlpha = alpha
    }

    if (this.camera) {
      position.add(this.camera.position)
    }

    this.ctx.drawImage(image, position.x, position.y, width, height)
    this.ctx.globalAlpha = 1
  }

  end() {
    this.camera = null
    this.ctx.globalAlpha = 1
  }
}
