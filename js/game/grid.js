import Utils from '../engine/utils.js'
import Tile from './tile.js'

export default class Grid {
  size = null
  grid = null
  debug = true

  /**
   *
   * @param {Number} size
   * @param {String} color
   */
  constructor(size = 10, debug = true) {
    this.size = Utils.clamp(size, 1, 50)
    this.debug = debug

    this.grid = this.#createGrid(this.size)
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

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   * @param {Camera} camera
   */
  draw(spriteRenderer, camera) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const tile = this.grid[i][j]
        tile.draw(spriteRenderer, camera)
      }
    }
  }
}
