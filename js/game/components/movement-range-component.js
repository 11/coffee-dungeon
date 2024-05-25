import { InternalError } from '../../engine/errors.js'
import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
import Color from '../../engine/gfx/color.js'

import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import OrthographicTile from '../tilemap/orthographic-tile.js'

export default class MovementRangeComponent {
  shapeRenderer = null

  range = null
  gridPosition = null
  tilemap = null

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
  }

  /**
   * Runs BFS on tilemap and find all non-populated cells that are in range
   *
   * @param {Vector2} gridPosition
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
      seen[`${node.x}${node.y}`] = node

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
          outOfRange[`${n.x}${n.y}`] = n
          continue
        }

        const key = `${n.x}${n.y}`
        const value = seen[key] || outOfRange[key]
        if (!value) {
          queue.push(n)
        }
      }
    }

    return Object.values(seen)
  }

  draw() {
    const positions = this.#findPositionsInRange(this.gridPosition, this.range)
    for (const pos of positions) {
      const screenPos = OrthographicTilemap.mapToGlobal(pos)
      screenPos.subScalar(OrthographicTile.TILE_SIZE / 2)

      this.shapeRenderer.begin()
      this.shapeRenderer.FillStyle = Color.YELLOW
      this.shapeRenderer.drawRectangle(screenPos.x, screenPos.y, OrthographicTile.TILE_SIZE, OrthographicTile.TILE_SIZE)
      this.shapeRenderer.end()
    }
  }
}
