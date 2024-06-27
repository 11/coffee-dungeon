import OrthographicCamera from './orthographic-camera'
import TextureRegion from '../assets/texture-region'
import { NotImplementedError } from '../errors'
import { Vector2 } from '../math/Vector2'
import { NormalizedNumber } from '../math/MathUtils'

export default class SpriteRenderer {
  private ctx: CanvasRenderingContext2D | null = null
  private camera: OrthographicCamera | null = null

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  public constructor(ctx: CanvasRenderingContext2D = window.game.RenderContext) {
    this.ctx = ctx
  }

  public begin(camera: OrthographicCamera = null) {
    this.camera = camera
  }

  public drawTexture(texture: string, position: Vector2, width: number = 0, height: number = 0, alpha: number = 1): void {
    // TODO: create a texture class
    throw new NotImplementedError('drawTexture - TODO: need to implement Texture class')
  }

  public drawTextureRegion(textureRegion: TextureRegion, position: Vector2, width: number, height: number, alpha: NormalizedNumber = 1, dx?: number, dy?: number, dw?: number, dh?: number): void {
    if (alpha !== 1) {
      this.ctx.globalAlpha = alpha
    }

    if (this.camera) {
      position.add(this.camera.Position)
    }

    textureRegion.draw(this.ctx, position, width, height, dx, dy, dw, dh)

    this.ctx.globalAlpha = 1
  }

  public drawImage(imageId: string, position: Vector2, width: number, height: number, alpha: NormalizedNumber = 1): void {
    const image = window.game.AssetManager.get(imageId)

    if (alpha !== 1) {
      this.ctx.globalAlpha = alpha
    }

    if (this.camera) {
      position.add(this.camera.Position)
    }

    this.ctx.drawImage(image, position.x, position.y, width, height)
    this.ctx.globalAlpha = 1
  }

  public end(): void {
    this.camera = null
    this.ctx.globalAlpha = 1
  }
}
