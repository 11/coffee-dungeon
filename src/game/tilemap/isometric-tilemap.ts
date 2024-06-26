import IsometricTile from './isometric-tile'
import ShapeRenderer from '../../engine/gfx/shape-renderer'
import OrthographicCamera from '../../engine/gfx/orthographic-camera'
import { Vector2 } from '../../engine/math/Vector2'
import { isInsideTriangleArea } from '../../engine/math/MathUtils'
import { NotImplementedError } from '../../engine/errors'
import SpriteRenderer from '../../engine/gfx/sprite-renderer'

export default class IsometricTilemap {
  private shapeRenderer: ShapeRenderer
  private camera: OrthographicCamera

  private debug: boolean = false
  private dimensions: Vector2
  private grid: IsometricTile[][]

  private iHat: Vector2
  private jHat: Vector2

  public get Dimension(): Vector2 {
    return this.dimensions
  }

  public constructor(
    dimensions: Vector2 = new Vector2(8, 8),
    debug: boolean = false,
    camera?: OrthographicCamera
  ) {
    this.dimensions = dimensions
    this.debug = debug

    this.grid = this.createGrid(this.dimensions)
    this.camera = camera
    this.shapeRenderer = new ShapeRenderer()

    this.iHat = new Vector2(1, 0.5).multiplyScalar(IsometricTile.WORLD_SIZE)
    this.jHat = new Vector2(-1, 0.5).multiplyScalar(IsometricTile.WORLD_SIZE)  }

  static mapToLocal(screenX: number, screenY: number): Vector2 {
    // TODO: parameterize this bad boy right here
    const isometricOrigin = new Vector2(5, 1)

    const cell = new Vector2(Math.floor(screenX / IsometricTile.SCREEN_SIZE_X), Math.floor(screenY / IsometricTile.SCREEN_SIZE_Y))
    const cellOffset = new Vector2(screenX % IsometricTile.SCREEN_SIZE_X, screenY % IsometricTile.SCREEN_SIZE_Y)

    const isometricPosition = new Vector2(
      (cell.y - isometricOrigin.y) + (cell.x - isometricOrigin.x) - 1, // we subtract 1 because our origin calculation is kinda broken atm
      (cell.y - isometricOrigin.y) - (cell.x - isometricOrigin.x) - 1 // we substract 1 because our origin calculate is kinda broken atm
    )

    const topLeftTriangle = [
      IsometricTile.SCREEN_SIZE_X / 2, 0,                  // top mid point
      0, IsometricTile.SCREEN_SIZE_Y / 2,                  // left mid point
      0, 0,                                       // top left point
    ]

    const topRightTriangle = [
      IsometricTile.SCREEN_SIZE_X / 2, 0,                  // top mid point
      IsometricTile.SCREEN_SIZE_X, IsometricTile.SCREEN_SIZE_Y / 2, // right mid point
      IsometricTile.SCREEN_SIZE_X, 0                       // top right corner
    ]

    const bottomLeftTriangle = [
      IsometricTile.SCREEN_SIZE_X / 2, IsometricTile.SCREEN_SIZE_Y, // bottom mid point
      0, IsometricTile.SCREEN_SIZE_Y / 2,                  // left mid point
      0, IsometricTile.SCREEN_SIZE_Y                       // bottom left point
    ]

    const bottomRightTriangle = [
      IsometricTile.SCREEN_SIZE_X / 2, IsometricTile.SCREEN_SIZE_Y, // bottom mid point
      IsometricTile.SCREEN_SIZE_X, IsometricTile.SCREEN_SIZE_Y / 2, // right mid point
      IsometricTile.SCREEN_SIZE_X, IsometricTile.SCREEN_SIZE_Y      // bottom right point
    ]

    const isInTopLeftTriangle = isInsideTriangleArea(cellOffset.x, cellOffset.y, topLeftTriangle[0], topLeftTriangle[1], topLeftTriangle[2], topLeftTriangle[3], topLeftTriangle[4], topLeftTriangle[5])
    const isInTopRightTriangle = isInsideTriangleArea(cellOffset.x, cellOffset.y, topRightTriangle[0], topRightTriangle[1], topRightTriangle[2], topRightTriangle[3], topRightTriangle[4], topRightTriangle[5])
    const isInBottomLeftTriangle = isInsideTriangleArea(cellOffset.x, cellOffset.y, bottomLeftTriangle[0], bottomLeftTriangle[1], bottomLeftTriangle[2], bottomLeftTriangle[3], bottomLeftTriangle[4], bottomLeftTriangle[5])
    const isInBottomRightTriangle = isInsideTriangleArea(cellOffset.x, cellOffset.y, bottomRightTriangle[0], bottomRightTriangle[1], bottomRightTriangle[2], bottomRightTriangle[3], bottomRightTriangle[4], bottomRightTriangle[5])

    if (isInTopLeftTriangle) {
      isometricPosition.x--
    } else if (isInTopRightTriangle) {
      isometricPosition.y--
    } else if (isInBottomLeftTriangle) {
      isometricPosition.y++
    } else if (isInBottomRightTriangle) {
      isometricPosition.x++
    }

    return isometricPosition
  }

  public static mapToGlobal(gridPosition: Vector2, camera?: OrthographicCamera): Vector2 {
    throw new NotImplementedError('Not yet implemented')
  }

  private createGrid(dimensions: Vector2): IsometricTile[][] {
    const grid = []
    for (let i = 0; i < dimensions.x; i++) {
      grid[i] = []

      for (let j = 0; j < dimensions.y; j++) {
        const x = i
        const y = j
        grid[i][j] = new IsometricTile('dirt-tileset', x, y, this.debug)
      }
    }

    return grid
  }

  private drawIsometricGrid(spriteRenderer: SpriteRenderer, camera?: OrthographicCamera): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const tile = this.grid[i][j]
        tile.draw(spriteRenderer, camera)
      }
    }
  }

  public draw(spriteRenderer: SpriteRenderer, camera: OrthographicCamera): void {
    this.drawIsometricGrid(spriteRenderer, camera)
  }
}
