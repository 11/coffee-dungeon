import { InternalError } from '../../engine/errors'
import ShapeRenderer from '../../engine/gfx/shape-renderer'
import { Vector2 } from '../../engine/math/Vector2'
import Color from '../../engine/gfx/color'
import HashSet from '../../engine/collections/hash-set'
import OrthographicTilemap from '../tilemap/orthographic-tilemap'
import OrthographicTile from '../tilemap/orthographic-tile'

export default class MovementRangeComponent {
  private shapeRenderer: ShapeRenderer

  private range: number
  private gridPosition: Vector2
  private tilemap: OrthographicTilemap

  private positionsInRange: HashSet | null

  public constructor(range, gridPosition, tilemap) {
    this.range = range
    this.gridPosition = gridPosition
    this.tilemap = tilemap

    this.shapeRenderer = new ShapeRenderer()
    this.positionsInRange = null
  }

  /**
   * Runs BFS on tilemap and find all non-populated cells that are in range
   */
  private findPositionsInRange(gridPosition: Vector2, range: number): HashSet {
    if (!gridPosition) {
      throw new InternalError('Invalid grid position')
    }

    if (range <= 0) {
      throw new InternalError(`Range is not a positive number - ${range}`)
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
        if (isPopulated || isOutOfRange) {
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

  public isPositionInRange(gridPosition: Vector2): boolean {
    return this.positionsInRange.has(gridPosition)
  }

  public resetRange(): void {
    this.positionsInRange = this.findPositionsInRange(this.gridPosition, this.range)
  }

  public draw(): void {
    if (!this.positionsInRange) {
      this.positionsInRange = this.findPositionsInRange(this.gridPosition, this.range)
    }

    for (const pos of this.positionsInRange) {
      const screenPos = OrthographicTilemap.mapToGlobal(pos)
      screenPos.subScalar(OrthographicTile.TILE_SIZE / 2)

      this.shapeRenderer.begin()
      this.shapeRenderer.FillStyle = Color.YELLOW
      this.shapeRenderer.drawRectangle(screenPos.x, screenPos.y, OrthographicTile.TILE_SIZE, OrthographicTile.TILE_SIZE)
      this.shapeRenderer.end()
    }
  }
}
