import ShapeRenderer from '../../engine/gfx/shape-renderer'
import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import Color from '../../engine/gfx/color'

import GridActor from '../actors/grid-actor'
import { Vector2 } from '../../engine/math/Vector2'

export default class OrthographicTile {
  public static TILE_SIZE = 96

  private shapeRenderer: ShapeRenderer

  private debug: boolean
  private actor: GridActor
  private imageId: string
  private gridCoordinate: Vector2

  public get ImageId(): string {
    return this.imageId
  }

  public get GridCoordinate() {
    return this.gridCoordinate
  }

  public get Populated() {
    return this.actor !== null
  }

  public get Actor(): GridActor {
    return this.actor
  }

  public set Actor(gridActor: GridActor) {
    this.actor = gridActor
  }

  constructor(imageId: string, gridCoordinate: Vector2, debug?: boolean) {
    this.imageId = imageId
    this.gridCoordinate = gridCoordinate
    this.debug = debug

    this.shapeRenderer = new ShapeRenderer()
  }

  private drawDebugTile(): void {
    const x = this.gridCoordinate.x * OrthographicTile.TILE_SIZE
    const y = this.gridCoordinate.y * OrthographicTile.TILE_SIZE

    let color = Color.GREEN
    if ((this.gridCoordinate.x + this.gridCoordinate.y) % 2 === 0) {
      color = Color.WHITE
    }

    if (this.actor?.Selected && this.actor?.IsPlayer) {
      color = Color.YELLOW
    }

    this.shapeRenderer.begin()
    this.shapeRenderer.FillStyle = color
    this.shapeRenderer.drawRectangle(x, y, OrthographicTile.TILE_SIZE, OrthographicTile.TILE_SIZE)
    this.shapeRenderer.end()
  }

  public draw(spriteRenderer: SpriteRenderer): void {
    if (this.debug) {
      this.drawDebugTile()
    }
  }
}
