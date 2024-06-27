import { Vector2 } from '../math/Vector2'

export default class TextureRegion {
  private dx: number
  private dy: number
  private dw: number
  private dh: number
  private image: CanvasImageSource

  constructor(imageId: string, dx: number, dy: number, dw: number, dh: number) {
    this.image = window.game.AssetManager.get(imageId)
    this.dx = dx
    this.dy = dy
    this.dw = dw
    this.dh = dh
  }

  draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    width: number,
    height: number,
    dx: number | null = null,
    dy: number | null = null,
    dw: number | null = null,
    dh: number | null = null
  ) {
    const DX = dx ?? this.dx
    const DY = dy ?? this.dy
    const DW = dw ?? this.dw
    const DH = dh ?? this.dh

    ctx.drawImage(
      this.image,
      DX, DY,
      DW, DH,
      position.x, position.y,
      width, height
    )
  }
}
