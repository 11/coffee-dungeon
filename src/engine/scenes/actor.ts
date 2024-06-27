import SpriteRenderer  from '../gfx/sprite-renderer.js'
import OrthographicCamera from '../gfx/orthographic-camera.js'

export default class Actor {
  private x: number
  private y: number
  private width: number
  private height: number
  private imageId: string

  constructor(x: number, y: number, width: number, height: number, imageId: string) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.imageId = imageId
  }

  public initialize(): void {
    console.log('Actor initialize')
  }

  public update(): void {
    console.log('Actor update')
  }

  public draw(spriteRenderer: SpriteRenderer, camera: OrthographicCamera): void {
    console.log('Actor draw')
  }
}
