import ShapeRenderer from '../gfx/shape-renderer.js'
import { InternalError } from '../errors.js'
import { Vector2 } from '../threejs-math/index.js'
import OrthographicTile from './orthographic-tile.js'
import OrthographicCamera from '../gfx/orthographic-camera.js'

export default class OrthographicTilemap {
  debug = false

  dimensions = null
  grid = null
  camera = null
  shapeRenderer = null

  get Dimensions() {
    return this.dimensions
  }
  /**
   *
   * @param {Vector2} dimensions
   * @param {OrthographicCamera} camera
   */
  constructor(
    dimensions = new Vector2(8, 8),
    camera = null
  ) {
    this.dimensions = dimensions
    this.camera = camera
    this.shapeRenderer = new ShapeRenderer()
    this.grid = this.#createGrid(this.dimensions)
  }

  /**
   *
   * @param {Vector2} dimensions
   * @returns [][]Tile
   */
  #createGrid(dimensions) {
    if (!dimensions) {
      throw new InternalError('Dimensions not defined')
    }

    const grid = []
    for (let i = 0; i < dimensions.x; i++) {
      grid[i] = []

      for (let j = 0; j < dimensions.y; j++) {
        const x = i
        const y = j
        grid[i][j] = new OrthographicTile(null, new Vector2(x, y), this.debug)
      }
    }

    return grid
  }

  /**
   *
   * @param {Vector2} screenCoordinates
   * @return {Vector2} tilemapCoordinate
   */
  static mapToLocal(screenCoordinates) {
    const x = Math.floor(screenCoordinates.x / OrthographicTile.TILE_SIZE)
    const y = Math.floor(screenCoordinates.y / OrthographicTile.TILE_SIZE)
    return new Vector2(x, y)
  }

  /**
   * This is going to return the center point of a tile in screen coordinates
   * @param {Vector2} tilemapCoordinate
   * @return {Vector2} screenCoordinate
   */
  static mapToGlobal(tilemapCoordinate) {
    const x = (tilemapCoordinate.x * OrthographicTile.TILE_SIZE) + (OrthographicTile.TILE_SIZE / 2)
    const y = (tilemapCoordinate.y * OrthographicTile.TILE_SIZE) + (OrthographicTile.TILE_SIZE / 2)
    return new Vector2(x, y)
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  draw(spriteRenderer) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const tile = this.grid[i][j]
        tile.draw(spriteRenderer)
      }
    }
  }
}
