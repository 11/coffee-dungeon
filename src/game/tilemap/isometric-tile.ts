import { Vector2 } from '../../engine/math/Vector2'
import Color from '../../engine/gfx/color'
import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import ShapeRenderer from '../../engine/gfx/shape-renderer'
import OrthographicCamera from '../../engine/gfx/orthographic-camera'
import TextureRegion from '../../engine/assets/texture-region'
import GridActor from '../actors/grid-actor'

export default class IsometricTile {
  public static WORLD_SIZE = 64
  public static SCREEN_SIZE_X = IsometricTile.WORLD_SIZE * 2
  public static SCREEN_SIZE_Y = IsometricTile.WORLD_SIZE

  private actor: GridActor
  private tileBackgroundTextureRegion: TextureRegion

  private debug: boolean
  private shapeRenderer = new ShapeRenderer()

  private gridX: number
  private gridY: number

  private position: Vector2 = null // position is the top middle corner in isometric perspective
  private iHat: Vector2 = new Vector2(1, 0.5).multiplyScalar(IsometricTile.WORLD_SIZE)
  private jHat: Vector2 = new Vector2(-1, 0.5).multiplyScalar(IsometricTile.WORLD_SIZE)

  public constructor(imageId: string, gridX: number, gridY: number, debug: boolean = false) {
    this.gridX = gridX
    this.gridY = gridY
    this.debug = debug
    this.tileBackgroundTextureRegion = new TextureRegion(
      imageId,
      102, 0, // spritesheet dx and dy
      102, 101, // spritesheet dw and dh
    )

    this.position = this.gridCoordinateToIsometricCoordinate(gridX, gridY)

    this.iHat = new Vector2(1, 0.5).multiplyScalar(IsometricTile.WORLD_SIZE)
    this.jHat = new Vector2(-1, 0.5).multiplyScalar(IsometricTile.WORLD_SIZE)
  }

  private gridCoordinateToIsometricCoordinate(gridX: number, gridY: number): Vector2 {
    const i = this.iHat.clone()
    i.multiplyScalar(gridX)

    const j = this.jHat.clone()
    j.multiplyScalar(gridY)

    return new Vector2(
      i.x + j.x,
      i.y + j.y
    )
  }

  private drawIsometricDebugLines(camera: OrthographicCamera): void {
    const half = IsometricTile.WORLD_SIZE / 2
    const topCorner = new Vector2(this.position.x, this.position.y)
    const rightCorner = new Vector2(this.position.x + IsometricTile.WORLD_SIZE, this.position.y + half)
    const bottomCorner = new Vector2(this.position.x, this.position.y + IsometricTile.WORLD_SIZE)
    const leftCorner = new Vector2(this.position.x - IsometricTile.WORLD_SIZE, this.position.y + half)

    this.shapeRenderer.StrokeStyle = Color.RED
    this.shapeRenderer.LineWidth = 4
    this.shapeRenderer.begin(camera)
    this.shapeRenderer.drawCircle(this.position.x, this.position.y, 5)
    this.shapeRenderer.drawPolygon(
      topCorner.x, topCorner.y,
      rightCorner.x, rightCorner.y,
      bottomCorner.x, bottomCorner.y,
      leftCorner.x, leftCorner.y,
    )
    this.shapeRenderer.end()
  }

  private drawMouseTileDebugLines(camera: OrthographicCamera): void {
    // just so hapens that the gridX and gridY, when added together
    // is the forumla for the mouse grid
    if ((this.gridX + this.gridY) % 2 !== 0) {
      return
    }

    const topLeftCorner = new Vector2(this.position.x - IsometricTile.WORLD_SIZE, this.position.y)
    const topRightCorner = new Vector2(this.position.x + IsometricTile.WORLD_SIZE, this.position.y)
    const bottomLeftCorner = new Vector2(this.position.x - IsometricTile.WORLD_SIZE, this.position.y + IsometricTile.WORLD_SIZE)
    const bottomRightCorner = new Vector2(this.position.x + IsometricTile.WORLD_SIZE, this.position.y + IsometricTile.WORLD_SIZE)

    this.shapeRenderer.StrokeStyle = Color.WHITE
    this.shapeRenderer.LineWidth = 4
    this.shapeRenderer.begin(camera)
    this.shapeRenderer.drawPolygon(
      topLeftCorner.x, topLeftCorner.y,
      topRightCorner.x, topRightCorner.y,
      bottomRightCorner.x, bottomRightCorner.y,
      bottomLeftCorner.x, bottomLeftCorner.y,
    )
    this.shapeRenderer.end()
  }

  private drawTileBackgroundTextureRegion(spriteRenderer: SpriteRenderer, camera: OrthographicCamera): void {
    const textureX = this.position.x - IsometricTile.WORLD_SIZE // subtract 1 tile's size to render image based on the center of a tile
    const textureY = this.position.y// same logic applies for a tile's height, but need to half the height to force the isometric perspective
    const textureW = IsometricTile.WORLD_SIZE * 2 // double the size of the image to fill the grid cell
    const textureH = IsometricTile.WORLD_SIZE * 2 // double the size of the image to file the grid cell

    const alpha = this.debug
      ? 0.5
      : 1

    spriteRenderer.begin(camera)
    spriteRenderer.drawTextureRegion(this.tileBackgroundTextureRegion, new Vector2(textureX, textureY), textureW, textureH, alpha)
    spriteRenderer.end()
  }

  public draw(spriteRenderer: SpriteRenderer, camera: OrthographicCamera) {
    this.drawTileBackgroundTextureRegion(spriteRenderer, camera)

    if (this.debug) {
      this.drawIsometricDebugLines(camera)
      this.drawMouseTileDebugLines(camera)
    }
  }
}
