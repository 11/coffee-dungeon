import { InternalError } from '../../engine/errors.js'
import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
import Color from '../../engine/gfx/color.js'
import HashSet from '../../engine/collections/hash-set.js'

import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import OrthographicTile from '../tilemap/orthographic-tile.js'

export default class MovementRangeComponent {
  shapeRenderer = null

  range = null
  gridPosition = null
  tilemap = null

  cellsInRange = null

  /**
   *
   * @param {Number} range - the amount of tiles the player can move from it's current position
   * @param {Vector2} gridPosition
   * @param {OrthographicTilemap} tilemap
   */
  constructor(range, gridPosition, tilemap) {
    this.range = range
    this.gridPosition = gridPosition
    this.tilemap = tilemap

    this.shapeRenderer = new ShapeRenderer()
    this.positionsInRange = []
    this.cellsInRange = null
  }

  /**
   * Runs BFS on tilemap and find all non-populated cells that are in range
   *
   * @param {Vector2} gridPosition
   * @param {Number} range
   * @return {Vector2[]}
   */
  #findPositionsInRange (gridPosition, range) {
    if (!gridPosition) {
      throw new InternalError('Invalid grid position')
    }

    if (range <= 0) {
      console.warn(`Range is not a positive number - ${range}`)
      return []
    }

    const seen = {}
    const outOfRange = {}
    const queue = [gridPosition]

    while (queue.length > 0) {
      const node = queue.shift()
      seen[node.toHash()] = node

      const neighbors = [
        node.clone().setY(node.y - 1), // north
        node.clone().setY(node.y + 1), // south
        node.clone().setX(node.x + 1), // east
        node.clone().setX(node.x - 1), // west
      ]

      for (const n of neighbors) {
        const isPopulated = this.tilemap.getTile(n)?.Populated ?? true
        const isOutOfRange = (Math.abs(gridPosition.x - n.x) + Math.abs(gridPosition.y - n.y)) > range
        if(isPopulated || isOutOfRange) {
          outOfRange[n.toHash()] = n
          continue
        }

        const key = n.toHash()
        const value = seen[key] || outOfRange[key]
        if (!value) {
          queue.push(n)
        }
      }
    }

    return new HashSet(Object.values(seen))
  }

  /**
   *
   * @param {Vector2} gridPosition
   */
  isPositionInRange(gridPosition) {
    return this.cellsInRange.has(gridPosition)
  }

  updateRange() {
    this.cellsInRange = this.#findPositionsInRange(this.gridPosition, this.range)
  }

  draw() {
    if (!this.cellsInRange) {
      this.cellsInRange = this.#findPositionsInRange(this.gridPosition, this.range)
    }

    for (const pos of this.cellsInRange) {
      const screenPos = OrthographicTilemap.mapToGlobal(pos)
      screenPos.subScalar(OrthographicTile.TILE_SIZE / 2)

      this.shapeRenderer.begin()
      this.shapeRenderer.FillStyle = Color.YELLOW
      this.shapeRenderer.drawRectangle(screenPos.x, screenPos.y, OrthographicTile.TILE_SIZE, OrthographicTile.TILE_SIZE)
      this.shapeRenderer.end()
    }
  }
}
