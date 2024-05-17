import Tile from './tile.js'
import ShapeRenderer from '../gfx/shape-renderer.js'
import { isInsideTriangleArea } from '../math.js'
import { Vector2 } from '../threejs-math/index.js'

export default class IsometricTileMap {
  debug = false

  dimensions = null
  grid = null
  players = null
  shapeRenderer = null
  camera = null

  iHat = new Vector2(1, 0.5).multiplyScalar(Tile.WORLD_SIZE)
  jHat = new Vector2(-1, 0.5).multiplyScalar(Tile.WORLD_SIZE)

  /**
   *
   * @param {Number} size
   * @param {String} color
   */
  constructor(dimensions = new Vector2(10, 10), camera = null, debug = false) {
    this.dimensions = dimensions
    this.debug = debug

    this.grid = this.#createGrid(this.dimensions)
    this.camera = null
    this.shapeRenderer = new ShapeRenderer()
  }

  /**
   * TODO: render based on camera offset
   * @param {number} screenX
   * @param {number} screenY
   * @return {Vector2}
   */
  static mapToLocal(screenX, screenY) {
    // TODO: parameterize this bad boy right here
    const isometricOrigin = new Vector2(5, 1)

    const cell = new Vector2(Math.floor(screenX / Tile.SCREEN_SIZE_X), Math.floor(screenY / Tile.SCREEN_SIZE_Y))
    const cellOffset = new Vector2(screenX % Tile.SCREEN_SIZE_X, screenY % Tile.SCREEN_SIZE_Y)

    const isometricPosition = new Vector2(
      (cell.y - isometricOrigin.y) + (cell.x - isometricOrigin.x) - 1, // we subtract 1 because our origin calculation is kinda broken atm
      (cell.y - isometricOrigin.y) - (cell.x - isometricOrigin.x) - 1 // we substract 1 because our origin calculate is kinda broken atm
    )

    const topLeftTriangle = [
      Tile.SCREEN_SIZE_X / 2, 0,                  // top mid point
      0, Tile.SCREEN_SIZE_Y / 2,                  // left mid point
      0, 0,                                       // top left point
    ]

    const topRightTriangle = [
      Tile.SCREEN_SIZE_X / 2, 0,                  // top mid point
      Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y / 2, // right mid point
      Tile.SCREEN_SIZE_X, 0                       // top right corner
    ]

    const bottomLeftTriangle = [
      Tile.SCREEN_SIZE_X / 2, Tile.SCREEN_SIZE_Y, // bottom mid point
      0, Tile.SCREEN_SIZE_Y / 2,                  // left mid point
      0, Tile.SCREEN_SIZE_Y                       // bottom left point
    ]

    const bottomRightTriangle = [
      Tile.SCREEN_SIZE_X / 2, Tile.SCREEN_SIZE_Y, // bottom mid point
      Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y / 2, // right mid point
      Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y      // bottom right point
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

  /**
   *
   * @param {Vector2} gridPosition
   * @return {Vector2} screen coordinates of cell
   */
  static mapToGlobal(gridPosition, camera) {
    // gridPosition.sub(isometricOrigin)

    const iHat = new Vector2(1, 0.5).multiplyScalar(Tile.WORLD_SIZE)
    const jHat = new Vector2(-1, 0.5).multiplyScalar(Tile.WORLD_SIZE)

    iHat.multiplyScalar(gridPosition.x)
    jHat.multiplyScalar(gridPosition.y)

    const globalPosition = new Vector2(
      iHat.x + jHat.x,
      iHat.y + jHat.y
    )

    return globalPosition
  }

  /**
   *
   * @param {Vector2} dimensions
   * @returns [][]Tile
   */
  #createGrid(dimensions) {
    const grid = []
    for (let i = 0; i < dimensions.x; i++) {
      grid[i] = []

      for (let j = 0; j < dimensions.y; j++) {
        const x = i
        const y = j
        grid[i][j] = new Tile('dirt-tileset', x, y, this.debug)
      }
    }

    return grid
  }

  #drawIsometricGrid(spriteRenderer, camera) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const tile = this.grid[i][j]
        tile.draw(spriteRenderer, camera)
      }
    }
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   * @param {Camera} camera
   */
  draw(spriteRenderer, camera) {
    this.#drawIsometricGrid(spriteRenderer, camera)
  }

  /**
   * @return {Vector2} dimensions
   */
  get Dimensiosn() {
    return this.dimensions
  }
}
