import Utils from '../engine/utils.js'
import Tile from './tile.js'
import ShapeRenderer from '../engine/gfx/shape-renderer.js'

export default class Grid {
  size = null
  grid = null
  debug = false

  shapeRenderer = null

  /**
   *
   * @param {Number} size
   * @param {String} color
   */
  constructor(size = 10, debug = false) {
    this.size = Utils.clamp(size, 1, 50)
    this.debug = debug

    this.grid = this.#createGrid(this.size)
    this.shapeRenderer = new ShapeRenderer()
  }

  /**
   *
   * @param {Number} size
   * @returns [][]Tile
   */
  #createGrid(size) {
    const grid = []
    for (let i = 0; i < size; i++) {
      grid[i] = []

      for (let j = 0; j < size; j++) {
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

  insert(gridX, gridY) {

  }

  remove(gridX, gridY) {

  }

  get Size() {
    return this.size
  }
}
